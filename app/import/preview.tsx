"use client";
import styles from "./styles.module.css";
import { useEffect, useState, Suspense, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
  DefaultProperties,
  SuspendingImage,
  SvgIconFromText,
} from "@react-three/uikit";
import { Button } from "@/src/components/button";
import { FigmaProvider, useFigmaContext } from "../auth/figmaTokenContext";
import UI from "./ui";
import { noEvents } from "@coconut-xr/xinteraction/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorView from "./editor";
import { Color } from "three";
import PKCanvas from "../../src/components/pk/PKCanvas";
import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import { SessionModeGuard, useXR } from "@coconut-xr/natuerlich/react";
import { signal } from "@preact/signals-react";
import StarterScene from "../exports/import-screen/scene";
import { Grab } from "@react-three/uikit-lucide";

// import { staticLayoutData } from "./layoutData";

const FEATURE_TESTS = { vectors: false };

const SPECIAL_NAME_TOKENS = [/\[.*?\]/, "*"];

const CONTAINER_NODE_TYPES = [
  "FRAME",
  "COMPONENT",
  "INSTANCE",
  "GROUP",
  "ELLIPSE",
  "RECTANGLE",
];
const RENDER_NODE_TYPES = [
  ...CONTAINER_NODE_TYPES,
  "IMAGE",
  "TEXT",
  "RECTANGLE",
  "SECTION",
  "VECTOR",
  "BOOLEAN_OPERATION",
  "STAR",
  "LINE",
  "ELLIPSE",
  "REGULAR_POLYGON",
];
const TRAVERSE_NODE_TYPES = ["FRAME", "CANVAS", "DOCUMENT"]; // [...RENDER_NODE_TYPES, "CANVAS", "DOCUMENT"];

export default function Preview({ ...props }) {
  // layoutData = staticLayoutData;
  // if (!layoutData) return <></>;
  const { token, nodeId, fileId, startingPointNodeId } = useFigmaContext();
  const hasScene = nodeId && fileId ? true : false;

  const xrState = useXR.getState();
  const isAR = xrState.mode === "immersive-ar";

  useEffect(() => {
    // console.log("switched mode", xrState.mode);
  }, [xrState.mode]);

  const [fullscreen, setFullscreen] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  const [layoutData, setLayoutData] = useState<null | any>(null);
  const [interactions, setInteractions] = useState({
    // actions123: {
    //   hover: {
    //     transformTranslateZ: 40,
    //   },
    // },
    // Bottom123: {
    //   hover: {
    //     backgroundOpacity: 0,
    //   },
    // },
  });
  const [layoutTsxString, setLayoutTsxString] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // setLoaded(false);
    if (token && fileId && nodeId) {
      // console.log("start import", token, fileId, nodeId, startingPointNodeId);
      importFigma(token, fileId, nodeId);
    } else {
      setLayoutData(null);
      setShowEditor(false);
    }
    // console.log("check params");
  }, [token, fileId, nodeId, startingPointNodeId]);

  useEffect(() => {
    if (layoutData) {
      // setRootNode(layoutData.nodes[Object.keys(layoutData.nodes)[0]].document);
      setLoaded(true);
      // console.log(layoutData.nodes[Object.keys(layoutData.nodes)[0]].document);
    } else {
      // setRootNode(null);
      setLoaded(false);
    }
  }, [layoutData]);

  const [loadingStatus, setLoadingStatus] = useState("");

  const importFigma = (token, fileId, nodeId) => {
    setLayoutData(null);
    setLoadingStatus("Loading file...");
    if (token && fileId && nodeId) {
      const fileUrl = `https://api.figma.com/v1/files/${fileId}?geometry=paths`;

      fetch(fileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (jsonData) => {
          setLoadingStatus("Parsing file...");
          jsonData.document = addParentsAndSiblings(jsonData.document);

          const allNodes = jsonData.document;

          let rootNode = findNodeById(allNodes, nodeId);
          // console.log(rootNode, allNodes, nodeId, fileId);
          if (rootNode.type == "FRAME") {
            jsonData.rootNodeId = rootNode.id;
            // Loop through parents to get page
            let currentNode = rootNode;
            let pageNode;
            while (currentNode.parentNode) {
              if (currentNode.parentNode.type === "CANVAS") {
                pageNode = currentNode.parentNode;
                break;
              }
              currentNode = currentNode.parentNode;
            }
            // console.log(rootNode, pageNode);
            jsonData.pageNodeId = pageNode.id;
          } else {
            jsonData.pageNodeId = rootNode.id;
            if (startingPointNodeId) {
              // This is a flow, start at the start
              jsonData.rootNodeId = startingPointNodeId;
            } else {
              // Set the root to the first child of the page
              jsonData.rootNodeId = rootNode.children[0].id;
            }
          }
          setLoadingStatus("Grouping layers...");
          const groupedLayersByName = groupLayersByName(jsonData.document);

          // User must put components in their file instead of this
          // const componentSetIds = Object.keys(jsonData.componentSets);
          // const componentIds = Object.keys(jsonData.components);
          // const componentsUrl = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${componentSetIds.join(",")},${componentIds.join(",")}`;
          // console.log("requesting components", componentsUrl);
          // fetch(componentsUrl, {
          //   headers: {
          //     // "X-FIGMA-TOKEN": token,
          //     Authorization: `Bearer ${token}`,
          //   },
          // })
          //   .then((response) => response.json())
          //   .then(async (componentData) => {
          //     console.log("componentData", componentData);
          //     jsonData.componentData = componentData;

          // Get images for each layer that needs it
          setLoadingStatus("Fetching images...");
          const imagesUrl = `https://api.figma.com/v1/files/${fileId}/images`;
          // console.log("requesting images", imagesUrl);
          fetch(imagesUrl, {
            headers: {
              // "X-FIGMA-TOKEN": token,
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then(async (imageData) => {
              // console.log("imageData", imageData);
              jsonData.fileId = fileId;
              jsonData.images = imageData?.meta?.images || [];
              jsonData.layersByName = groupedLayersByName;
              setLoadingStatus("Flattening layers...");
              fetchLayoutImages(jsonData, fileId);
            });
        });
    }
  };

  const groupLayersByName = (jsonData) => {
    return Object.entries(jsonData).reduce(
      (prevValue, [key, value], index, acc) => {
        // console.log(prevValue, key, value, index, acc);
        if (key === "id") {
          const name = acc.find((nodeProp: any, i) => nodeProp[0] == "name");

          if (name && typeof name[1] == "string") {
            // console.log("found name", name[1]);
            let layerName = name[1];
            // for (var regexp in SPECIAL_NAME_TOKENS) {
            //   layerName = layerName.replace(regexp, "");
            // }
            // layerName = layerName.trim();
            prevValue[layerName] = value;
          }
        } else if (key === "children" && Array.isArray(value)) {
          // If the key is 'children', recursively reduce children
          value.forEach((child) => {
            Object.assign(prevValue, groupLayersByName(child));
          });
        }
        return prevValue;
      },
      {}
    );
  };

  const fetchLayoutImages = (jsonData, fileId) => {
    let imagesByNodeId = {};
    // for (var i in jsonData.nodes) {
    imagesByNodeId = checkLayerForImages(
      jsonData.document,
      imagesByNodeId,
      jsonData.fileId
    );
    // }
    const nodeIds = Object.keys(imagesByNodeId).join(",");
    // console.log("flatten ids", nodeIds, imagesByNodeId);
    // fetchImageByNodeId(nodeId);
    const imagesUrl = `https://api.figma.com/v1/images/${fileId}?ids=${nodeIds}&scale=2&use_absolute_bounds=true`;
    // console.log("getting images", imagesUrl);
    if (nodeIds?.length > 0) {
      setLoadingStatus("Fetching more images...");
      fetch(imagesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (imageData) => {
          const imageSrc = imageData.images;
          // console.log("flattened images", imageData.images);

          jsonData.flatNodeImages = imageData.images;
          finalLoadStep(jsonData);
        });
    } else {
      jsonData.flatNodeImages = {};
      finalLoadStep(jsonData);
    }

    return jsonData;
  };
  const finalLoadStep = (jsonData) => {
    setLoadingStatus("Starting layout...");
    // console.log("loaded", jsonData);
    setLayoutData(jsonData);
  };
  const addParentsAndSiblings = (node, parentNode = null) => {
    node.parentNode = parentNode;

    if (node.children && node.children.length) {
      const newChildren: null | any = [];
      let prevChild: null | any = null;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        let newChild;
        newChild = addParentsAndSiblings(child, node);
        if (TRAVERSE_NODE_TYPES.indexOf(child.type) > -1) {
          child.nextSibling = null;
          if (prevChild) {
            prevChild.nextSibling = child;
          }
          child.prevSibling = prevChild;
          prevChild = newChild;
        } else {
        }

        newChildren.push(newChild);
      }

      node.children = newChildren;
    }

    return node;
  };

  const checkLayerForImages = (node, imagesByNodeId, fileId) => {
    const hasVisibleFills = node.fills?.some((fill) => fill.visible !== false);
    const shouldRaster = node.name.indexOf("*") > -1;
    const hasComplexFills = node.fills?.some((fill) => fill.type !== "SOLID");
    const hasComplexStrokes = node.strokes?.some(
      (stroke) => stroke.type !== "SOLID"
    );
    // console.log(node.name, hasComplexStrokes, hasComplexFills, node.fills);

    if (!FEATURE_TESTS.vectors && node.type == "VECTOR") {
      imagesByNodeId[node.id] = true;
    }

    if (
      (hasComplexFills || hasComplexStrokes) &&
      (!node.children || node.children?.length < 1)
    ) {
      // Flatted image if the layer has complex fills or strokes and has no children
      imagesByNodeId[node.id] = true;
    }

    // Manual rasterize
    if (shouldRaster) {
      // Flatted image if the user explicitly wants to
      imagesByNodeId[node.id] = true;
    }

    if (node.children && !shouldRaster) {
      for (var i in node.children) {
        imagesByNodeId = checkLayerForImages(
          node.children[i],
          imagesByNodeId,
          fileId
        );
      }
    }
    return imagesByNodeId;
  };

  const [incrementNode, setIncrementNode] = useState({
    increment: 0,
    at: Date.now(),
  });

  const uiComponent = (
    <UI
      key="ui"
      onSwitch={(fullscreen) => {
        // console.log("fullscreen", fullscreen);
        setFullscreen(fullscreen);
      }}
      onNavigate={(increment) => {
        // console.log("onNavigate", increment);
        setIncrementNode({ increment, at: Date.now() });
      }}
      // onImport={() => console.log("import")}
      isLoaded={loaded}
      loadingStatus={loadingStatus}
      onToggleEditor={(val) => setShowEditor(val)}
    />
  );

  return (
    <PanelGroup direction="vertical">
      <Panel maxSize={90} defaultSize={75}>
        <PKCanvas
          isFullscreen={fullscreen}
          events={noEvents}
          style={{ height: "100%", touchAction: "none" }}
          gl={{ localClippingEnabled: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1} position={[-5, 5, 10]} />
          {!hasScene && (
            <>
              <StarterScene />
            </>
          )}
          <SessionModeGuard allow={"immersive-ar"}>
            <mesh
              position={[0, 0.9, -0.5]}
              scale={0.05}
              rotation={[-0.4, 0, 0]}
            >
              {/* <Grabbable position={[0, 0, 0]}> */}
              <Scene
                layoutData={layoutData}
                interactions={interactions}
                isFullscreen={fullscreen}
                incrementNode={incrementNode}
                handleStringOutput={(str) => {
                  // console.log(str);
                  setLayoutTsxString(str);
                }}
              />
              {/* </Grabbable> */}
            </mesh>
          </SessionModeGuard>
          <SessionModeGuard deny={"immersive-ar"}>
            <>
              <Fullscreen>
                {uiComponent}
                {fullscreen && layoutData && (
                  <Scene
                    layoutData={layoutData}
                    interactions={interactions}
                    isFullscreen={fullscreen}
                    incrementNode={incrementNode}
                    handleStringOutput={(str) => setLayoutTsxString(str)}
                  />
                )}
              </Fullscreen>
              {!fullscreen && layoutData && (
                <>
                  <Scene
                    layoutData={layoutData}
                    interactions={interactions}
                    isFullscreen={fullscreen}
                    incrementNode={incrementNode}
                    handleStringOutput={(str) => {
                      // console.log(str);
                      setLayoutTsxString(str);
                    }}
                  />
                </>
              )}
            </>
          </SessionModeGuard>
        </PKCanvas>
      </Panel>

      {showEditor && (
        <>
          <PanelResizeHandle style={{ height: 8, background: "#000" }} />
          <Panel maxSize={75}>
            <EditorView
              layoutData={layoutData}
              layoutTsxString={layoutTsxString}
              isFullscreen={fullscreen}
              interactions={interactions}
              onInteractionUpdate={(interactionJson) => {
                setInteractions(JSON.parse(interactionJson));
              }}
            />
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}

const findNodeById = (nodes, id: string) => {
  // Base case: If the current node's id matches the target id, return the node.
  if (nodes.id === id) {
    return nodes;
  }

  // If the current node has children, recursively search in the children.
  if (nodes.children && nodes.children.length > 0) {
    for (let i = 0; i < nodes.children.length; i++) {
      const child = nodes.children[i];
      // child.parentNode = nodes;
      const found = findNodeById(child, id);
      // child.nextSibling = nodes.children[i + 1];
      // child.prevSibling = nodes.children[i - 1];
      if (found) {
        return found; // Node found in children, return it.
      }
    }
  }

  // Node not found in this branch of the hierarchy.
  return undefined;
};

function Scene({
  isFullscreen,
  incrementNode,
  layoutData,
  interactions,
  handleStringOutput,
  ...props
}) {
  const { token, nodeId, fileId, startingPointNodeId } = useFigmaContext();

  // const [currentNodeId, setCurrentNodeId] = useState(layoutData.rootNodeId);
  useEffect(() => {
    if (incrementNode.increment > 0) {
      // console.log("go next");
      linkToNextNode();
    } else if (incrementNode.increment < 0) {
      // console.log("go prev");
      linkToPrevNode();
    }
  }, [incrementNode]);

  // const rootNode = layoutData.nodes[
  //   Object.keys(layoutData.nodes)[0]
  // ].document.children.find((node) => node.id === layoutData.rootNodeId);
  const allNodes = layoutData.document;
  // const rootNode = findNodeById(allNodes, layoutData.rootNodeId);
  // const firstNodeId = (allNodes.type=="CANVAS") ? allNodes.children[0] :layoutData.rootNodeId
  const [rootNode, setRootNode] = useState(
    findNodeById(allNodes, layoutData.rootNodeId)
  );

  const linkToNodeId = (nodeId) => {
    const linkNode = findNodeById(allNodes, nodeId);
    // console.log("linking to", nodeId, linkNode);
    if (linkNode) {
      setRootNode(linkNode);
    }
  };
  const linkToNode = (node) => {
    if (node) {
      setRootNode(node);
    }
  };
  const linkToNextNode = () => {
    // console.log(rootNode, rootNode.nextSibling);
    if (rootNode.nextSibling?.type == "FRAME") {
      setRootNode(rootNode.nextSibling);
    }
  };
  const linkToPrevNode = () => {
    if (rootNode.prevSibling) {
      setRootNode(rootNode.prevSibling);
    }
  };

  if (rootNode?.type !== "FRAME") {
    return <></>;
  }

  ////// TRANSITIONS, MAKE THIS REUSABLE
  // const rootTransitionStart = {
  //   // scale: 0.5,
  //   transformTranslateX: 0,
  //   opacity: 0,
  // };
  // const rootTransitionEnd = {
  //   // scale: 1,
  //   transformTranslateX: 0,
  //   opacity: 1,
  // };
  // useEffect(() => {
  //   for (const key of Object.keys(rootTransitionTarget)) {
  //     rootTransitionProps[key].value = rootTransitionStart[key];
  //     // if (key == "transformTranslateX")
  //     //   rootTransitionProps[key].value = 100 * incrementNode.increment;
  //   }
  //   // console.log("dd", incrementNode);
  //   setRootTransitionTarget({
  //     ...rootTransitionEnd,
  //     transformTranslateX: 0,
  //   });
  // }, [rootNode, incrementNode]);
  // const [rootTransitionTarget, setRootTransitionTarget] =
  //   useState(rootTransitionStart);
  // const rootTransitionProps = useMemo(() => {
  //   const result = {};
  //   for (const key of Object.keys(rootTransitionStart)) {
  //     result[key] = signal(rootTransitionStart[key]);
  //   }
  //   return result;
  // }, []);
  // useFrame((_, delta) => {
  //   for (const key of Object.keys(rootTransitionTarget)) {
  //     rootTransitionProps[key].value = damp(
  //       rootTransitionProps[key].value,
  //       rootTransitionTarget[key],
  //       0.8,
  //       0.1
  //     );
  //   }
  // });
  ////// TRANSITIONS END

  // // Turn layout JSON into TSX
  useEffect(() => {
    const layoutText = figmaLayerText({
      node: rootNode,
      layoutData,
      // overflow: "scroll",
    });
    let sceneString = `
    import { Root, Fullscreen, Container, Text, Image, Content } from "@react-three/uikit";
    export default function Layout(){`;
    if (isFullscreen) {
      sceneString += `return (<Fullscreen>
          ${layoutText}
         </Fullscreen>`;
    } else {
      sceneString += `return (<Root
        pixelSize={0.01}
        sizeX={${rootNode.absoluteBoundingBox?.width / 100}}
        sizeY={${rootNode.absoluteBoundingBox?.height / 100}}
      >
        ${layoutText}
      </Root>`;
    }
    sceneString += `)}`;
    // console.log("sceneString", sceneString);
    handleStringOutput(sceneString);
    // window._sceneString = sceneString;
  }, [layoutData]);

  if (isFullscreen) {
    return (
      <FigmaLayer
        node={rootNode}
        layoutData={layoutData}
        interactions={interactions}
        linkTo={(node) => linkToNodeId(node)}
        // width={"100%"}
        // height={"100%"}
        // overflow="scroll"
      />
    );
  } else {
    return (
      <>
        <Grabbable position={[0, 0, 0]}>
          <Root
            pixelSize={0.01}
            sizeX={rootNode.absoluteBoundingBox.width / 100}
            sizeY={rootNode.absoluteBoundingBox.height / 100}
            // transformTranslateZ={-420}
            {...props}
          >
            {/* <mesh {...rootTransitionProps}> */}

            <FigmaLayer
              node={rootNode}
              linkTo={(node) => linkToNodeId(node)}
              layoutData={layoutData}
              interactions={interactions}
              // {...rootTransitionProps}
            />

            {/* </mesh> */}
          </Root>
        </Grabbable>
      </>
    );
  }
}

function FigmaLayer({
  node,
  parentNode = null,
  linkTo,
  layoutData = {
    document: {},
    images: {},
    components: {},
    flatNodeImages: {},
    layersByName: {},
  },
  interactions,
  ...props
}) {
  if (node.visible == false) return <></>;
  const [nodeVariant, setNodeVariant] = useState(node);
  const [isHovering, setIsHovering] = useState(false);
  const outerPropsFromNode = figOuterProps(node, parentNode, layoutData);
  const innerPropsFromNode = figInnerProps(node, parentNode);

  const [targetProps, setTargetProps] = useState({
    transformTranslateZ: props.transformTranslateZ
      ? props.transformTranslateZ
      : 0,
  });

  const componentSet = layoutData.components[node.componentId]
    ? findNodeById(
        layoutData.document,
        layoutData.components[node.componentId].componentSetId
      )
    : null;
  const hoverNodeVariant = componentSet
    ? componentSet.children.find(
        (variant) => variant.name.toLowerCase().indexOf("=hover") > -1
      )
    : null;

  useEffect(() => {
    setNodeVariant(node);
  }, [node]);

  // useEffect(() => {
  //   if (!node?.componentId) return;
  //   const componentSet = findNodeById(
  //     layoutData.document,
  //     layoutData.components[node.componentId].componentSetId
  //   );
  //   const hoverNodeVariant = componentSet.children.find(
  //     (variant) => variant.name.toLowerCase().indexOf("=hover") > -1
  //   );
  //   if (hoverNodeVariant) {
  //     if (isHovering) {
  //       // console.log("set variant to", hoverNodeVariant);
  //       setNodeVariant(hoverNodeVariant);
  //     } else {
  //       // console.log("set variant to", node);
  //       setNodeVariant(node);
  //     }
  //   }
  // }, [isHovering]);

  const aniProps = ["transformTranslateZ"];
  const signalProps = useMemo(() => {
    const result = {};
    for (const key of aniProps) {
      result[key] = signal(0);
    }
    return result;
    // console.log(result);
  }, []);
  useFrame((_, delta) => {
    for (const key of aniProps) {
      //     // console.log(key, aniProps, aniProps[key], signalProps, signalProps);
      //     //where damp is a function that computes a value between "from" and "to" based on the delta time and some constant
      signalProps[key].value = damp(
        signalProps[key].value,
        targetProps[key],
        0.1,
        0.1
      );
    }
  });

  // console.log("outerPropsFromNode", outerPropsFromNode);

  let innerComponent;

  // const shouldRaster = node.name.indexOf("*") > -1;
  // TODO: Have better approach to flattened images and how to use them with children
  // Could have children
  // if (shouldRaster) {

  // Layer has been flagged to rasterize
  if (layoutData.flatNodeImages[nodeVariant.id]) {
    innerComponent = (
      <Image
        src={layoutData.flatNodeImages[nodeVariant.id]}
        borderRadius={nodeVariant.cornerRadius ? nodeVariant.cornerRadius : 0}
        // transformRotateZ={-(node.rotation * 180) / Math.PI}
      />
    );
  } else if (CONTAINER_NODE_TYPES.indexOf(nodeVariant.type) > -1) {
    // Handle hover state for instances
    if (nodeVariant.type == "INSTANCE") {
      // const componentSet = findNodeById(
      //   layoutData.document,
      //   layoutData.components[nodeVariant.componentId].componentSetId
      // );
      // if (componentSet) {
      //   const hoverVariant = componentSet.children.find(
      //     (variant) => variant.name.toLowerCase().indexOf("=hover") > -1
      //   );
      //   if (hoverVariant && isHovering) {
      //     node = hoverVariant;
      //   }
      // }
    } else if (nodeVariant.type == "ELLIPSE") {
      nodeVariant.cornerRadius = 9999;
    }

    // Child layers if there's children
    let nodeChildren = [];
    if (nodeVariant.children) {
      nodeChildren = nodeVariant.children.map((childNode, i) => {
        return (
          <FigmaLayer
            key={childNode.id + "_" + i}
            node={childNode}
            linkTo={linkTo}
            parentNode={nodeVariant}
            layoutData={layoutData}
            interactions={interactions}
          />
        );
      });
    }

    innerComponent = (
      <Container {...innerPropsFromNode} key={nodeVariant.id + "-container"}>
        {nodeChildren}
      </Container>
    );

    // Fill layers if ther's' fills
    const hasVisibleFills = nodeVariant.fills.some(
      (fill) => fill.visible !== false
    );
    if (nodeVariant.fills && hasVisibleFills) {
      //   // For any gradient or image, we need to flatten them, and just have 1 background
      // Fill Types
      // SOLID
      // GRADIENT_LINEAR
      // GRADIENT_RADIAL
      // GRADIENT_ANGULAR
      // GRADIENT_DIAMOND
      // IMAGE
      // EMOJI
      // VIDEO
      [...nodeVariant.fills].reverse().forEach((fill, i) => {
        // if (
        //   layoutData.flatNodeImages[node.id] &&
        //   (fill.type == "IMAGE" || fill.type.indexOf("GRADIENT") > -1)
        // ) {
        //   innerComponent = (
        //     <Suspense>
        //       <SuspendingImage
        //         {...figFillProps(fill, node, i)}
        //         {...figImageProps(
        //           fill,
        //           node,
        //           layoutData.flatNodeImages[node.id]
        //         )}
        //       >
        //         {innerComponent}
        //       </SuspendingImage>
        //     </Suspense>
        //   );
        // } else
        if (fill.type == "SOLID") {
          innerComponent = (
            <Container {...figFillProps(fill, nodeVariant, i)}>
              {innerComponent}
            </Container>
          );
        }
      });
    }
    if (nodeVariant.strokes && !layoutData.flatNodeImages[nodeVariant.id]) {
      [...nodeVariant.strokes].reverse().forEach((stroke, i) => {
        if (stroke.visible !== false) {
          innerComponent = (
            <Container {...figStrokeProps(stroke, nodeVariant, i)}>
              {innerComponent}
            </Container>
          );
        }
      });
    }
  } else if (nodeVariant.type == "TEXT") {
    innerComponent = (
      <Container key={nodeVariant.id + "-container"} {...innerPropsFromNode}>
        <Text key={nodeVariant.id + "-text"} {...figTextProps(nodeVariant)}>
          {nodeVariant.characters}
        </Text>
      </Container>
    );
  } else if (nodeVariant.type == "VECTOR") {
    // <Container key={node.id + "-container"} {...innerPropsFromNode}>
    // <SvgIconFromText {...figSVGProps(node)} {...innerPropsFromNode} />;
    let path;
    if (nodeVariant.fillGeometry[0]) {
      path = nodeVariant.fillGeometry[0].path;
    } else if (nodeVariant.strokeGeometry[0]) {
      path = nodeVariant.strokeGeometry[0].path;
    }
    if (path) {
      innerComponent = (
        <Container key={nodeVariant.id + "-container"} {...innerPropsFromNode}>
          <SvgIconFromText
            svgWidth={nodeVariant.size.x}
            svgHeight={nodeVariant.size.y}
            text={`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path d="${path}" />
          </svg>`}
            width={nodeVariant.absoluteBoundingBox.width}
          />
        </Container>
      );
    } else {
      innerComponent = <Text>Issue with vector {nodeVariant.name}</Text>;
    }

    // </Container>;
  }

  // REMOVED: Because padding pushes these fill layers in
  // TODO: Figure out how to do multiple fills, just use 1 for now

  // Need layout props on outer container, then padding on the inner container

  // console.log("figOuterprops", node.name, outerPropsFromNode);
  // {node.type == "TEXT" && <Text>{node.characters}</Text>}
  //
  // @bbohlender I think this is where the interactions would go. Maybe you need a ref or something to track the states at the top of the component, not sure
  if (interactions[nodeVariant.name]) {
    // console.log("node has interactions", interactions, interactions[node.name]);
  }

  let linkName: null | string = null;
  if (nodeVariant.name.match(/\[to=(.*?)\]/i, "")?.length > 1) {
    // has a link
    linkName = nodeVariant.name.match(/\[to=(.*?)\]/i, "")[1];
    // console.log("has link name", linkName, node.name);
  }
  // const [aniProps, setAniProps] = useState(["transformTranslateY"]);

  return (
    <Container
      {...props}
      {...outerPropsFromNode}
      {...{
        onPointerUp: nodeVariant.transitionNodeID
          ? () => {
              console.log(nodeVariant);
              linkTo(nodeVariant.transitionNodeID);
            }
          : null,
      }}
      onHoverChange={(hover) => {
        if (hoverNodeVariant) {
          if (hover) {
            // console.log("set variant to", hoverNodeVariant);
            setNodeVariant(hoverNodeVariant);
          } else {
            // console.log("set variant to", node);
            setNodeVariant(node);
          }
        }
      }}
      // {...(interactions[node.name] ? interactions[node.name] : {})}
      {...(linkName
        ? {
            onPointerDown: () => {
              // if (linkName) {
              //   const linkNode = layoutData.layersByName[linkName];
              //   if (linkNode) {
              //     console.log(linkNode);
              //     linkTo(linkNode);
              //   }
              // }
            },
          }
        : {})}
      // {...signalProps}
      // onPointerDown={(e) => {
      //   console.log(targetProps);
      //   setTargetProps({
      //     transformTranslateZ: targetProps.transformTranslateZ == 0 ? -40 : 0,
      //   });
      //   e.stopPropagation();
      // }}
      // {...{ border: 1, borderColor: "#f09" }}
    >
      {innerComponent}
    </Container>
  );
}

function damp(currentValue, targetValue, delta, speed) {
  return (
    currentValue + (targetValue - currentValue) * Math.min(1, delta * speed)
  );
}

function figmaLayerText({
  node,
  parentNode = null,
  layoutData = { images: {}, flatNodeImages: {} },
  ...props
}) {
  const outerPropsFromNode = figOuterProps(node, parentNode, layoutData);
  const innerPropsFromNode = figInnerProps(node, parentNode);

  let innerComponent;

  if (layoutData.flatNodeImages[node.id]) {
    innerComponent = `<Image src={"${layoutData.flatNodeImages[node.id]}"} borderRadius={${node.cornerRadius ? node.cornerRadius : 0}} />`;
  }
  // Could have children
  else if (CONTAINER_NODE_TYPES.indexOf(node.type) > -1) {
    // Child layers if there's children
    let nodeChildren = [];
    if (node.children) {
      nodeChildren = node.children.map((childNode, i) => {
        return figmaLayerText({
          node: childNode,
          parentNode: node,
          layoutData: layoutData,
        });
      });
    }
    innerComponent = `
      <Container
        key={"${node.name}"}
        {...${JSON.stringify({ ...innerPropsFromNode })}} {...${JSON.stringify(props)}}
      >${nodeChildren.join("\n")}</Container>`;

    // Fill layers if ther's' fills
    const hasVisibleFills = node.fills.some((fill) => fill.visible !== false);
    if (node.fills && hasVisibleFills) {
      [...node.fills].reverse().forEach((fill, i) => {
        // const nodeFills = node.fills.map((fill, i) => {
        if (fill.type == "IMAGE") {
          innerComponent = `<Image {...${JSON.stringify(figFillProps(fill, node, i))}}
            {...${JSON.stringify(figImageProps(fill, node, layoutData.flatNodeImages[node.id]))}}
            >{${innerComponent}}</Image>`;
        } else {
          innerComponent = `<Container
        {...${JSON.stringify(figFillProps(fill, node, i))}}
        >{${innerComponent}}</Container>`;
        }
        // });
        // nodeChildren = nodeChildren.concat(nodeFills);
      });
    }
    if (node.strokes) {
      [...node.strokes].reverse().forEach((stroke, i) => {
        if (stroke.visible !== false) {
          innerComponent = `<Container
        {...${JSON.stringify(figStrokeProps(stroke, node, i))}}
        >{${innerComponent}}</Container>`;
        }
      });
    }
  } else if (node.type == "TEXT") {
    innerComponent = `
      <Container
        key={"${node.name}-container"}
        {...${JSON.stringify(innerPropsFromNode)}}
      >
        <Text key={"${node.name}-text"}
        {...${JSON.stringify(figTextProps(node))}}>
          ${node.characters}
        </Text>
      </Container>
    `;
  }

  return `<Container {...${JSON.stringify(outerPropsFromNode)}}>{${innerComponent}}</Container>`;
}

function figImageProps(fill, node, imageSrc) {
  const props = {
    src: imageSrc,
    ...figCornerRadiusProps(node),
  };

  return props;
}
function figSVGProps(node) {
  let props: any = {};
  // console.log(node);
  // const propertyMappings = {
  //   opacity: "opacity",
  // };

  // for (const key in node.style) {
  //   if (propertyMappings[key]) {
  //     props[propertyMappings[key]] = node.style[key];
  //   }
  // }

  const hasVisibleFills = node.fills?.some((fill) => fill.visible !== false);
  // console.log(node.fills);
  // if (!hasVisibleFills) {
  //   props.opacity = 0;
  // }

  return {
    ...props,
    // color: hasVisibleFills ? figColor(node.fills[0].color) : "#fff",
    color: new Color().setHSL(0, 0, 0, "srgb"),
    svgWidth: node.size.x,
    svgHeight: node.size.y,
    text: `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 100"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        >
          <path d="${"M76.6681 0.0183768C76.3043 0.051794 73.0719 0.624063 72.683 0.703429L27.9399 9.72189L27.9232 9.72607C26.7566 9.97252 25.8408 10.3861 25.1341 10.9792C24.281 11.6935 23.8085 12.7044 23.6287 13.8823C23.5911 14.133 23.5284 14.6426 23.5284 15.3945C23.5284 15.3945 23.5284 61.059 23.5284 71.3348C23.5284 72.6423 23.4238 73.9121 22.5373 74.994C21.6508 76.0759 20.5553 76.4017 19.2715 76.6607C18.2972 76.857 17.3229 77.0533 16.3486 77.2497C12.652 77.9932 10.2476 78.4986 8.06901 79.3424C5.98658 80.1486 4.42685 81.1762 3.18491 82.4794C0.721953 85.0567 -0.277447 88.553 0.0654435 91.8279C0.358155 94.6224 1.61682 97.2958 3.7787 99.2716C5.23808 100.608 7.06125 101.623 9.21059 102.054C11.4394 102.501 13.8145 102.346 17.2852 101.644C19.1335 101.272 20.8647 100.692 22.5122 99.7185C24.1431 98.7578 25.5397 97.4754 26.6311 95.9132C27.7267 94.3467 28.4334 92.6049 28.8223 90.7544C29.2237 88.8454 29.3199 87.1203 29.3199 85.2155L29.3199 36.6979C29.3199 34.0997 30.0558 33.4147 32.155 32.9051C32.155 32.9051 69.3461 25.4113 71.0814 25.0729C73.5026 24.6092 74.6442 25.2985 74.6442 27.834L74.6442 60.9546C74.6442 62.2662 74.6316 63.5946 73.7368 64.6806C72.8503 65.7625 71.7547 66.0883 70.4709 66.3473C69.4966 66.5436 68.5223 66.74 67.548 66.9363C63.8515 67.6798 61.4471 68.1852 59.2684 69.029C57.186 69.8352 55.6263 70.8628 54.3843 72.1661C51.9214 74.7434 50.8342 78.2396 51.1771 81.5145C51.4698 84.309 52.8162 86.9824 54.9781 88.9582C56.4375 90.2949 58.2607 91.2807 60.41 91.7151C62.6388 92.1621 65.014 92.0033 68.4847 91.3058C70.3329 90.934 72.0641 90.3784 73.7117 89.4052C75.3425 88.4444 76.7391 87.162 77.8305 85.5998C78.9261 84.0333 79.6328 82.2915 80.0217 80.441C80.4231 78.532 80.4398 76.8069 80.4398 74.9021L80.4398 3.96996C80.4482 1.39684 79.0892 -0.190481 76.6681 0.0183768Z"}" />
        </svg>`,
    width: 200,
    // height: "100%",
  };
}

function figTextProps(node) {
  // const textProps = {
  //   fontFamily: "SF Pro Display",
  //   fontPostScriptName: "SFProDisplay-Semibold",
  //   fontWeight: 600,
  //   textAutoResize: "WIDTH_AND_HEIGHT",
  //   fontSize: 16,
  //   textAlignHorizontal: "CENTER",
  //   textAlignVertical: "TOP",
  //   letterSpacing: 0,
  //   lineHeightPx: 19.09375,
  //   lineHeightPercent: 100,
  //   lineHeightUnit: "INTRINSIC_%",
  // };
  let props: any = {};
  // figma:uikit
  const propertyMappings = {
    // color: "color",
    opacity: "opacity",
    // textAlignHorizontal: "horizontalAlign",
    // textAlignVertical: "verticalAlign",
    letterSpacing: "letterSpacing",
    // lineHeightPercent: "lineHeight",
    fontSize: "fontSize",
    // wordBreak: "wordBreak",
    // fontFamily: "fontFamily",
    fontWeight: "fontWeight",
  };

  //   let reactStyle = {};
  for (const key in node.style) {
    if (propertyMappings[key]) {
      props[propertyMappings[key]] = node.style[key];
    }
  }

  const hasVisibleFills = node.fills?.some((fill) => fill.visible !== false);
  if (!hasVisibleFills) {
    props.opacity = 0;
  }

  return {
    ...props,
    color: hasVisibleFills ? figColor(node.fills[0].color) : "#fff",
    lineHeight: node.style.lineHeightPx / node.style.fontSize,
    horizontalAlign: node.style.textAlignHorizontal.toLowerCase(),
    verticalAlign: node.style.textAlignVertical.toLowerCase(),
  };
}

function figFillProps(fill, node, fillIndex) {
  let props: any = {
    key: node.id + "_fill_" + fillIndex,
    backgroundOpacity: fill.opacity ? fill.opacity : 1,
    ...figCornerRadiusProps(node),
    flexGrow: 1,
    // width: "100%",
    // height: "100%",
    // border: 3,
    // borderColor: "#09f",
  };
  if (fill.type.indexOf("GRADIENT") > -1) {
    props.color = fill.gradientStops[0].color;
    props.opacity = fill.gradientStops[0].color.a;
  }
  props.alignSelf = "stretch";

  if (fill.color) {
    props.backgroundColor = figColor(fill.color);
  }

  return props;
}

function figStrokeProps(stroke, node, strokeIndex) {
  // {
  //   opacity: 0.6000000238418579,
  //   blendMode: "NORMAL",
  //   type: "SOLID",
  //   color: { r: 1, g: 0.8399999737739563, b: 0, a: 1 },
  // }
  let props: any = {
    key: node.id + "_stroke_" + strokeIndex,
    borderOpacity: stroke.opacity ? stroke.opacity : 1,
    border: node.strokeWeight,
    flexGrow: 1,
    // height: "100%",
    // borderColor: "#09f",
    // borderRadius: node.cornerRadius ? node.cornerRadius + node.strokeWeight : 0,
    ...figCornerRadiusPropsWithStroke(node),
  };
  if (stroke.type.indexOf("GRADIENT") > -1) {
    props.borderColor = stroke.gradientStops[0].color;
    props.borderOpacity = stroke.gradientStops[0].color.a;
  }

  if (stroke.color) {
    props.borderColor = figColor(stroke.color);
  }
  // TODO: Fix multiple strokes, it doesn't really work right now with sizing
  // if (strokeIndex > 1) {
  //   props.marginLeft = -node.strokeWeight * 10;
  //   props.marginRight = -node.strokeWeight * 10;
  //   props.marginTop = -node.strokeWeight;
  //   props.marginBottom = -node.strokeWeight;
  // }

  return props;
}

function figCornerRadiusProps(node) {
  const props: any = {};
  const maxRounding = Math.min(
    node.absoluteBoundingBox.width / 2,
    node.absoluteBoundingBox.height / 2
  );
  if (node.rectangleCornerRadii) {
    props.borderTopLeftRadius = Math.min(
      maxRounding,
      node.rectangleCornerRadii[0]
    );
    props.borderTopRightRadius = Math.min(
      maxRounding,
      node.rectangleCornerRadii[1]
    );
    props.borderBottomRightRadius = Math.min(
      maxRounding,
      node.rectangleCornerRadii[2]
    );
    props.borderBottomLeftRadius = Math.min(
      maxRounding,
      node.rectangleCornerRadii[3]
    );
  } else if (node.cornerRadius) {
    props.borderRadius = Math.min(maxRounding, node.cornerRadius);
  }
  return props;
}
function figCornerRadiusPropsWithStroke(node) {
  const props: any = figCornerRadiusProps(node);
  if (props.borderRadius) {
    props.borderRadius += node.strokeWeight * node.strokes.length;
  } else if (props.borderTopLeftRadius) {
    props.borderTopLeftRadius += node.strokeWeight * node.strokes.length;
    props.borderTopRightRadius += node.strokeWeight * node.strokes.length;
    props.borderBottomRightRadius += node.strokeWeight * node.strokes.length;
    props.borderBottomLeftRadius += node.strokeWeight * node.strokes.length;
  }
  return props;
}

function figOuterProps(node, parentNode, layoutData) {
  if (!node) return {};

  const { children, absoluteBoundingBox, ...orgProps } = node;
  let props: any = {};

  // uikit:figma
  const propertyMappings = {
    type: "type",
    opacity: "backgroundOpacity",
    itemSpacing: "gap",
    key: "name",
    minWidth: "minWidth",
    minHeight: "minHeight",
    maxWidth: "maxWidth",
    maxHeight: "maxHeight",
  };

  //   let reactStyle = {};
  for (const key in node) {
    if (propertyMappings[key]) {
      props[propertyMappings[key]] = node[key];
    }
  }
  if (node.clipsContent) {
    props.overflow = "hidden";
  }

  props = { ...figCornerRadiusProps(node), ...props };

  if (node.effects?.length > 0) {
    node.effects.forEach((effect, i) => {
      if (effect.type == "DROP_SHADOW" && effect.color.a == 0) {
        // This is a translation shadow
        props.transformTranslateZ = effect.offset.y;
        props.transformTranslateX = effect.offset.x;
      }
    });
  }

  if (node.rotation && !layoutData.flatNodeImages[node.id]) {
    // console.log("rot is", (node.rotation * 180) / Math.PI);
    props.transformRotateZ = (node.rotation * 180) / Math.PI;
  }

  // TODO: make this work somehow
  if (node.preserveRatio) {
    // props.aspectRatio = node.width / node.height;
    // props.border = 2;
    // props.borderColor = "#0f9";
    // props.keepAspectRatio = true;
  }

  // Layout logic
  const nodeBox = node.absoluteBoundingBox;
  const parentBox = parentNode?.absoluteBoundingBox;

  // There IS auto layout
  if (parentNode?.layoutMode) {
    props.positionType = "static";
    if (
      node.layoutSizingHorizontal == "FILL" ||
      node.layoutSizingVertical == "FILL"
    ) {
      props.flexGrow = 1;
      props.flexShrink = 1;
      props.alignSelf = "stretch";
    }
    if (node.layoutSizingHorizontal == "FIXED") {
      props.width = nodeBox.width;
    } else if (node.layoutSizingHorizontal == "HUG") {
      props.alignItems = "flex-start";
    }
    if (node.layoutSizingVertical == "FIXED") {
      props.height = nodeBox.height;
    } else if (node.layoutSizingVertical == "HUG") {
      props.alignItems = "flex-start";
    }

    // THERE IS NOT AUTOLAYOUT
  } else if (parentNode) {
    props = { ...props, ...node.absoluteBoundingBox };
    props.positionType = "absolute";

    if (node.constraints.vertical == "TOP") {
      props.positionTop = nodeBox.y - parentBox.y;
    } else if (node.constraints.vertical == "BOTTOM") {
      props.positionBottom =
        parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
      parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
    } else if (node.constraints.vertical == "TOP_BOTTOM") {
      props.positionTop = nodeBox.y - parentBox.y;
      props.positionBottom =
        parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
    } else if (node.constraints.vertical == "CENTER") {
      props.positionTop = nodeBox.y - parentBox.y;
    } else if (node.constraints.vertical == "SCALE") {
      props.positionTop = nodeBox.y - parentBox.y;
    }

    if (node.constraints.horizontal == "LEFT") {
      props.positionLeft = nodeBox.x - parentBox.x;
    } else if (node.constraints.horizontal == "RIGHT") {
      props.positionRight =
        parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
    } else if (node.constraints.horizontal == "LEFT_RIGHT") {
      const l = nodeBox.x - parentBox.x;
      const r = parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
      props.positionLeft = l;
      props.positionRight = r;
      props.width = (nodeBox.width / parentBox.width) * 100 + "%";
    } else if (node.constraints.horizontal == "CENTER") {
      props.positionLeft =
        ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
    } else if (node.constraints.horizontal == "SCALE") {
      props.positionLeft =
        ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
    }
  } else if (!parentNode) {
    // This is the root
    props.width = "100%";
    props.height = "100%";
    // style.overflow = "scroll";
  }

  props = {
    ...props,
  };

  // if (node.name == "Frame 2608029") {
  //   console.log(node);
  //   // props.flexGrow = 1;
  //   // props.flexShrink = 0;
  //   // props.width = 1200;
  //   props.border = 3;
  //   props.borderColor = "#f0f";
  //   // props.alignContent = "stretch";
  //   props.alignSelf = "stretch";
  //   // props.justifyContent = "space-between";
  // }

  delete props.key;

  return props;
}
function figInnerProps(node, parentNode) {
  if (!node) return {};

  const { children, absoluteBoundingBox, ...orgProps } = node;
  let props: any = {};

  // uikit:figma
  const propertyMappings = {
    type: "type",
    // cornerRadius: "borderRadius",
    // opacity: "backgroundOpacity",
    itemSpacing: "gap",
    key: "name",
    // overflow: node.clipsContent ? "hidden" : "visible",
  };

  //   let reactStyle = {};
  for (const key in node) {
    if (propertyMappings[key]) {
      props[propertyMappings[key]] = node[key];
    }
  }
  if (!parentNode) {
    props.positionTop = 0;
    props.positionLeft = 0;
    props.positionRight = 0;
    props.positionBottom = 0;
    props.positionType = "absolute";
    // props.width = "100%";
    // props.height = "100%";
    // props.overflow = "scroll";
  }

  if (!parentNode) {
    props.positionTop = 0;
    props.positionBottom = 0;
    props.width = "100%";
    props.height = "100%";
    props.overflow = "scroll";
  }

  // TODO: figure this yoga thing out
  // Padding ann inner component props
  switch (node.layoutAlign) {
    case "STRETCH":
      props.justifyContent = "space-between";
      props.alignContent = "stretch";
      props.alignSelf = "stretch";
      break;
  }
  if (
    node.layoutSizingHorizontal == "FILL" ||
    node.layoutSizingVertical == "FILL"
  ) {
    props.alignSelf = "stretch";
  }

  // Issue with padding: it pushes the background fill in, need to do padding in another container

  props.paddingTop = node.paddingTop;
  props.paddingBottom = node.paddingBottom;
  props.paddingLeft = node.paddingLeft;
  props.paddingRight = node.paddingRight;
  if (props.paddingRight) {
    // props.border = 3;
    // props.borderColor = "#f09";
  }

  if (node.layoutMode == "VERTICAL") {
    props.flexDirection = "column";
    props.flexBasis = node.height;
  } else if (node.layoutMode == "HORIZONTAL") {
    props.flexDirection = "row";
    props.flexBasis = node.width;
    // props.width="100%"
  }

  if (node.layoutWrap == "WRAP") {
    props.flexWrap = "wrap";
  } else {
    props.flexWrap = "no-wrap";
  }

  // Figma's alignment to Yoga's alignItems
  if (node.primaryAxisAlignItems) {
    switch (node.primaryAxisAlignItems) {
      case "MIN":
        props.justifyContent = "flex-start";
        break;
      case "MAX":
        props.justifyContent = "flex-end";
        break;
      case "CENTER":
        props.justifyContent = "center";
        break;
      case "SPACE_BETWEEN":
        props.justifyContent = "space-between";
        break;
    }
  }
  if (node.counterAxisAlignItems) {
    switch (node.counterAxisAlignItems) {
      case "MIN":
        props.alignItems = "flex-start";
        break;
      case "MAX":
        props.alignItems = "flex-end";
        break;
      case "CENTER":
        props.alignItems = "center";
        break;
      case "BASELINE":
        props.alignItems = "Baseline";
        break;
      default:
        props.alignItems = "stretch";
    }
  }

  const hasVisibleStrokes = node.strokes.some(
    (stroke) => stroke.visible !== false
  );

  // TODO: adjust width based on stroke & padding
  // if (hasVisibleStrokes) {
  //   if (props.width && node.strokeWeight && node.strokes.length > 0) {
  //     props.width -= node.strokes.length * node.strokeWeight;
  //   }
  //   if (props.height && node.strokeWeight && node.strokes.length > 0) {
  //     props.height -= node.strokes.length * node.strokeWeight;
  //   }
  // }
  // TODO: adjust width based on stroke & padding

  // if (node.name == "Frame 2608029") {
  //   console.log(node);
  //   props.flexGrow = 1;
  //   props.flexShrink = 0;
  //   props.width = "100%";
  //   props.border = 3;
  //   props.borderColor = "#f00";
  //   props.alignContent = "stretch";
  //   props.alignSelf = "stretch";
  //   props.justifyContent = "space-between";
  // }

  delete props.key;

  return props;
}

function figColor(color) {
  const translatedColor = {
    r: Math.round(color.r * 255),
    g: Math.round(color.g * 255),
    b: Math.round(color.b * 255),
    a: Math.round(color.a * 100) / 100,
  };
  const colorString = `rgba(${translatedColor.r}, ${translatedColor.g}, ${translatedColor.b}, ${translatedColor.a})`;
  return colorString;
}
