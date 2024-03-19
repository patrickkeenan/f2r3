"use client";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
} from "@react-three/uikit";
import { Button } from "@/app/components/button";
import { useFigmaContext } from "../auth/figmaTokenContext";
import UI from "./ui";
import { noEvents, XWebPointers } from "@coconut-xr/xinteraction/react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import EditorView from "./editor";
// import { staticLayoutData } from "./layoutData";

export default function Preview({ ...props }) {
  // layoutData = staticLayoutData;
  // if (!layoutData) return <></>;
  const { token, nodeId, fileId } = useFigmaContext();
  const hasScene = nodeId && fileId ? true : false;
  const [fullscreen, setFullscreen] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  const [layoutData, setLayoutData] = useState<null | any>(null);
  const [layoutTsxString, setLayoutTsxString] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [rootNode, setRootNode] = useState(null);
  useEffect(() => {
    // setLoaded(false);
    if (token && fileId && nodeId) {
      console.log("start import", token, fileId, nodeId);
      importFigma(token, fileId, nodeId);
    } else {
      setLayoutData(null);
      setShowEditor(false);
    }
    console.log("check params");
  }, [token, fileId, nodeId]);

  useEffect(() => {
    if (layoutData) {
      setRootNode(layoutData.nodes[Object.keys(layoutData.nodes)[0]].document);
      setLoaded(true);
      console.log(layoutData.nodes[Object.keys(layoutData.nodes)[0]].document);
    } else {
      setRootNode(null);
      setLoaded(false);
    }
  }, [layoutData]);

  const importFigma = (token, fileId, nodeId) => {
    setLayoutData(null);
    console.log("get", token, fileId, nodeId);
    if (token && fileId && nodeId) {
      const fileUrl = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`;
      // const fileUrl = `https://api.figma.com/v1/files/${fileId}`;
      console.log("getting", fileUrl, "X-FIGMA-TOKEN" + token);

      fetch(fileUrl, {
        headers: {
          // "X-FIGMA-TOKEN": token,
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (jsonData) => {
          console.log("got file data", jsonData);
          const imagesUrl = `https://api.figma.com/v1/files/${fileId}/images`;
          fetch(imagesUrl, {
            headers: {
              // "X-FIGMA-TOKEN": token,
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then(async (imageData) => {
              jsonData.fileId = fileId;
              jsonData.images = imageData.meta.images;

              fetchLayoutImages(jsonData, fileId);
            });
        });
    }
  };

  const fetchLayoutImages = (jsonData, fileId) => {
    let imagesByNodeId = {};
    for (var i in jsonData.nodes) {
      imagesByNodeId = checkLayerForImages(
        jsonData.nodes[i].document,
        imagesByNodeId,
        jsonData.fileId
      );
    }
    const nodeIds = Object.keys(imagesByNodeId).join(",");
    // fetchImageByNodeId(nodeId);
    const imagesUrl = `https://api.figma.com/v1/images/${fileId}?ids=${nodeIds}`;
    fetch(imagesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (imageData) => {
        const imageSrc = imageData.images;
        console.log("got image data", imageData, imageSrc);
        // Add node with src
        // flatNodeImages[i] = imageSrc;
        jsonData.flatNodeImages = imageData.images;
        setLayoutData(jsonData);
        // setLoaded(true);
      });

    return jsonData;
  };
  const checkLayerForImages = (node, imagesByNodeId, fileId) => {
    if (!node.fills) {
      console.log("no fill", node);
    } else {
      const hasComplexFills = node.fills.some((fill) => fill.type !== "SOLID");
      if (hasComplexFills) {
        console.log(node.id, hasComplexFills);
        imagesByNodeId[node.id] = "blank";
        // fetchImageByNodeId(node.id);
      }
    }
    if (node.children) {
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

  return (
    <PanelGroup direction="vertical">
      <Panel maxSize={90} defaultSize={75}>
        <Canvas
          events={noEvents}
          style={{ height: "100%", touchAction: "none" }}
          gl={{ localClippingEnabled: true }}
        >
          <XWebPointers />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={1} position={[-5, 5, 10]} />
          {!hasScene && (
            <>
              <mesh>
                <meshBasicMaterial color="#f09" />
                <sphereGeometry />
              </mesh>
              <OrbitControls />
            </>
          )}
          <Fullscreen>
            <UI
              key="ui"
              onSwitch={(fullscreen) => {
                console.log("fullscreen", fullscreen);
                setFullscreen(fullscreen);
              }}
              onImport={() => console.log("import")}
              isLoaded={loaded}
              onToggleEditor={(val) => setShowEditor(val)}
            />
            {fullscreen && (
              <Scene
                layoutData={layoutData}
                isFullscreen={fullscreen}
                handleStringOutput={(str) => setLayoutTsxString(str)}
              />
            )}
          </Fullscreen>
          {!fullscreen && (
            <>
              <Scene
                layoutData={layoutData}
                isFullscreen={fullscreen}
                handleStringOutput={(str) => setLayoutTsxString(str)}
              />
              <OrbitControls />
            </>
          )}
        </Canvas>
      </Panel>

      {showEditor && (
        <>
          <PanelResizeHandle style={{ height: 8, background: "#000" }} />
          <Panel maxSize={75}>
            <EditorView
              layoutData={layoutData}
              layoutTsxString={layoutTsxString}
              isFullscreen={fullscreen}
            />
          </Panel>
        </>
      )}
    </PanelGroup>
  );
}

function Scene({ isFullscreen, layoutData, handleStringOutput, ...props }) {
  if (!layoutData) return <></>;
  const rootNode = layoutData.nodes[Object.keys(layoutData.nodes)[0]].document;

  // // Turn layout JSON into TSX
  useEffect(() => {
    const layoutText = figmaLayerText({
      node: rootNode,
      layoutData,
      width: "100%",
      height: "100%",
      overflow: "scroll",
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
        sizeX={${rootNode.absoluteBoundingBox.width / 100}}
        sizeY={${rootNode.absoluteBoundingBox.height / 100}}
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
      // <Fullscreen>
      <FigmaLayer
        node={rootNode}
        layoutData={layoutData}
        width={"100%"}
        height={"100%"}
        overflow="scroll"
      />
      // </Fullscreen>
    );
  } else {
    return (
      <>
        <Root
          pixelSize={0.01}
          sizeX={rootNode.absoluteBoundingBox.width / 100}
          sizeY={rootNode.absoluteBoundingBox.height / 100}
        >
          {/* <Container
            {...{
              type: "FRAME",
              borderRadius: 28,
              x: 222,
              y: -974,
              width: 439,
              height: 363,
              positionType: "absolute",
              positionTop: 0,
              positionLeft: 0,
            }}
          >
            {
              <Container
                {...{
                  backgroundOpacity: 1,
                  borderRadius: 28,
                  backgroundColor: "rgba(255, 0, 0, 1)",
                }}
              >
                {
                  <Container
                    key={"Layout Test"}
                    {...{ type: "FRAME" }}
                    {...{ width: "100%", height: "100%", overflow: "scroll" }}
                  ></Container>
                }
              </Container>
            }
          </Container> */}
          <FigmaLayer node={rootNode} layoutData={layoutData} />
        </Root>
        <Environment background blur={1} preset="city" />
      </>
    );
  }
}

function FigmaLayer({
  node,
  parentNode = null,
  layoutData = { images: {}, flatNodeImages: {} },
  ...props
}) {
  const propsFromNode = figProps(node, parentNode);
  const innerPropsFromNode = figInnerProps(node, parentNode);

  // console.log("propsFromNode", propsFromNode);

  let innerComponent;

  // Could have children or fills
  if (
    node.type == "FRAME" ||
    node.type == "IMAGE" ||
    node.type == "RECTANGLE" ||
    node.type == "GROUP"
  ) {
    // Child layers if there's children
    let nodeChildren = [];
    if (node.children) {
      nodeChildren = node.children.map((childNode, i) => {
        return (
          <FigmaLayer
            key={childNode.id + "_" + i}
            node={childNode}
            parentNode={node}
            layoutData={layoutData}
          />
        );
      });
    }

    innerComponent = (
      <Container {...innerPropsFromNode} key={node.id + "-container"}>
        {nodeChildren}
      </Container>
    );
    // Fill layers if ther's' fills
    if (node.fills) {
      //   // For any gradient or image, we need to flatten them, and just have 1 background
      node.fills.forEach((fill, i) => {
        if (fill.type == "IMAGE") {
          innerComponent = (
            <Image
              {...figFillProps(fill, node, i)}
              {...figImageProps(fill, node, layoutData.flatNodeImages[node.id])}
            >
              {innerComponent}
            </Image>
          );
        } else {
          innerComponent = (
            <Container {...figFillProps(fill, node, i)}>
              {innerComponent}
            </Container>
          );
        }
      });
    }
  } else if (node.type == "TEXT") {
    innerComponent = (
      <Container key={node.id + "-container"} {...innerPropsFromNode}>
        <Text key={node.id + "-text"} {...figTextProps(node)}>
          {node.characters}
        </Text>
      </Container>
    );
  }

  // REMOVED: Because padding pushes these fill layers in
  // TODO: Figure out how to do multiple fills, just use 1 for now

  // Need layout props on outer container, then padding on the inner container

  // console.log("figprops", node.name, propsFromNode);
  // {node.type == "TEXT" && <Text>{node.characters}</Text>}

  return (
    <Container {...propsFromNode} {...props}>
      {innerComponent}
    </Container>
  );
}

// function FigmaFill({ fill, node, ...props }) {
//   const { token, nodeId, fileId } = useFigmaContext();

//   const [src, setSrc] = useState("");

//   useEffect(() => {
//     console.log("non solid fill", fill, token, node.id, fileId);
//     const imageUrl = `https://api.figma.com/v1/images/${fileId}?ids=${node.id}`;
//     // "/v1/images/:key?ids=1:2,1:3,1:4"
//     fetch(imageUrl, {
//       headers: {
//         // "X-FIGMA-TOKEN": figmaToken,
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then(async (imageData) => {
//         const imageSrc = imageData.images[node.id];
//         setSrc(imageSrc);
//         console.log("got image data", imageData, imageSrc);
//       });
//   }, []);

//   if (src == "") return <></>;
//   return (
//     <Container
//       width={"100%"}
//       height={"100%"}
//       positionType="absolute"
//       zIndexOffset={-1}
//       {...figFillProps(fill, node)}
//     >
//       <Image
//         width={"100%"}
//         height={"100%"}
//         {...figImageProps(fill, node, src)}
//       ></Image>
//     </Container>
//   );
// }

function figmaLayerText({
  node,
  parentNode = null,
  layoutData = { images: {}, flatNodeImages: {} },
  ...props
}) {
  const propsFromNode = figProps(node, parentNode);
  const innerPropsFromNode = figInnerProps(node, parentNode);

  let innerComponent;

  // Could have children or fills
  if (
    node.type == "FRAME" ||
    node.type == "IMAGE" ||
    node.type == "RECTANGLE" ||
    node.type == "GROUP"
  ) {
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
    if (node.fills) {
      node.fills.forEach((fill, i) => {
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

  return `<Container {...${JSON.stringify(propsFromNode)}}>{${innerComponent}}</Container>`;
}

function figImageProps(fill, node, imageSrc) {
  const props = {
    src: imageSrc,
    borderRadius: node.cornerRadius ? node.cornerRadius : 0,
  };

  // Doesn't exist, maybe a type issue?
  // if (fill.scaleMode == "FILL") {
  //   props.fit = "fill";
  // } else {
  //   props.fit = "cover";
  // }

  return props;
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

  return {
    ...props,
    color: figColor(node.fills[0].color),
    lineHeight: node.style.lineHeightPx / node.style.fontSize,
    horizontalAlign: node.style.textAlignHorizontal.toLowerCase(),
    verticalAlign: node.style.textAlignVertical.toLowerCase(),
  };
}

function figFillProps(fill, node, fillIndex) {
  let props: any = {
    key: node.id + "_fill_" + fillIndex,
    backgroundOpacity: fill.opacity ? fill.opacity : 1,
    borderRadius: node.cornerRadius ? node.cornerRadius : 0,
    flexGrow: 1,
  };
  if (fill.type.indexOf("GRADIENT") > -1) {
    props.color = fill.gradientStops[0].color;
    props.opacity = fill.gradientStops[0].color.a;
  }

  if (fill.color) {
    props.backgroundColor = figColor(fill.color);
  }

  return props;
}

function figProps(node, parentNode) {
  // console.log("node is", node);
  const { children, absoluteBoundingBox, ...orgProps } = node;
  let props: any = {};

  // uikit:figma
  const propertyMappings = {
    type: "type",
    cornerRadius: "borderRadius",
    opacity: "backgroundOpacity",
    itemSpacing: "gap",
    key: "name",
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

  // if (parentNode) {
  props = {
    ...props,
    ...translateFigmaConstraintsToReact(node, parentNode),
  };
  // } else {
  //   props = {
  //     ...props,
  //     ...node.absoluteBoundingBox,
  //   };
  // }

  // TODO: Temp solve for fills, just use the first solid one
  // if (
  //   node.type == "FRAME" ||
  //   node.type == "IMAGE" ||
  //   node.type == "RECTANGLE" ||
  //   node.type == "GROUP"
  // ) {
  //   const fill = node.fills.find((element) => element.type == "SOLID");
  //   if (fill) {
  //     props.backgroundColor = figColor(fill.color);
  //     props.backgroundOpacity = fill.opacity;
  //   }
  // }

  // for (let i in props) {
  //   if (i == "height") {
  //     console.log(
  //       "found height",
  //       i,
  //       props[i],
  //       props[i] == null || props[i] == undefined
  //     );
  //   }
  //   if (props[i] == null || props[i] == undefined || Number.isNaN(props[i])) {
  //     // console.log("found null", key);
  //     delete props[i];
  //   }
  // }
  // props["width"] = 1;
  // props["height"] = 1;

  return props;
}
function figInnerProps(node, parentNode) {
  // console.log("node is", node);
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

  props = {
    flexGrow: 1,
    ...props,
    ...translateFigmaInnerPropsToReact(node, parentNode),
  };

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

function translateFigmaInnerPropsToReact(node, parentNode) {
  let style: any = {};

  // Padding ann inner component props
  switch (node.layoutAlign) {
    case "STRETCH":
      style.justifyContent = "space-between";
      break;
  }

  // Issue with padding: it pushes the background fill in, need to do padding in another container

  style.paddingTop = node.paddingTop;
  style.paddingBottom = node.paddingBottom;
  style.paddingLeft = node.paddingLeft;
  style.paddingRight = node.paddingRight;

  if (node.layoutMode == "VERTICAL") {
    style.flexDirection = "column";
  } else if (node.layoutMode == "HORIZONTAL") {
    style.flexDirection = "row";
    // style.width="100%"
  }

  // Figma's alignment to Yoga's alignItems
  if (node.primaryAxisAlignItems) {
    switch (node.primaryAxisAlignItems) {
      case "MIN":
        style.alignItems = "flex-start";
        break;
      case "MAX":
        style.alignItems = "flex-end";
        break;
      case "CENTER":
        style.alignItems = "center";
        style.justifyContent = "center";
        break;
      case "SPACE_BETWEEN":
        style.alignItems = "space-between";
        style.justifyContent = "space-between";
        break;
    }
  }

  return style;
}

function translateFigmaConstraintsToReact(node, parentNode) {
  let style: any = {};
  const nodeBox = node.absoluteBoundingBox;
  const parentBox = parentNode?.absoluteBoundingBox;

  // props.positionLeft =
  //   node.absoluteRenderBounds.x - parentNode.absoluteBoundingBox.x;
  // props.positionTop =
  //   node.absoluteRenderBounds.y - parentNode.absoluteBoundingBox.y;

  // if (parentNode) {
  // There IS auto layout
  if (parentNode?.layoutMode) {
    style.positionType = "static";
    if (
      node.layoutSizingHorizontal == "FILL" ||
      node.layoutSizingVertical == "FILL"
    ) {
      style.flexGrow = 1;
    }
    if (node.layoutSizingHorizontal == "FIXED") {
      style.width = nodeBox.width;
    } else if (node.layoutSizingHorizontal == "HUG") {
      style.alignItems = "flex-start";
      delete style.width;
    }
    if (node.layoutSizingVertical == "FIXED") {
      style.height = nodeBox.height;
    } else if (node.layoutSizingVertical == "HUG") {
      // style.alignItems = "flex-start";
      // delete style.height;
    }

    // if (parentNode.layoutSizingHorizontal == "HUG") {
    //   style.borderColor = "#f00";
    //   style.positionRight = undefined;
    //   style.positionLeft = undefined;

    //   // style.flexShrink = 1;
    // }
    // if (parentNode.layoutSizingVertical == "HUG") {
    //   style.borderColor = "#ff7";
    //   style.positionTop = undefined;
    //   style.positionBottom = undefined;
    //   // style.flexShrink = 1;
    // }

    // if (node.layoutSizingVertical == "HUG") {
    //   style.borderColor = "#f0f";
    //   // style.positionType = "static";
    //   // style.flexShrink = 1;
    // }
    // if (node.layoutSizingHorizontal == "HUG") {
    //   style.borderColor = "#0ff";
    //   style.flexShrink = 1;
    //   style.padding = 0;
    //   style.margin = 0;
    //   // style.positionType = "static";
    //   // style.flexShrink = 1;
    // }

    if (node.itemSpacing) {
      // style.justifyContent = "space-between"; // Simplified example
    }

    // if (parentNode.layoutMode == "VERTICAL") {
    //   style.positionType = "static";
    // } else if (parentNode.layoutMode == "HORIZONTAL") {
    //   style.positionType = "static";
    //   // style.width="100%"
    // }

    // style.itemSpacing = 0;

    // Figma's padding to Yoga's padding

    // if (style.height) {
    //   if (parentNode.paddingTop) {
    //     style.height = style.height + parentNode.paddingTop;
    //     style.paddingTop = parentNode.paddingTop;
    //   }

    //   if (parentNode.paddingBottom) {
    //     style.height = style.height + parentNode.paddingBottom;
    //     style.paddingBottom = parentNode.paddingBottom;
    //   }
    // }
    // if (style.width) {
    //   if (parentNode.paddingRight) {
    //     style.width = style.width + parentNode.paddingRight;
    //     style.paddingRight = parentNode.paddingRight;
    //   }
    //   if (parentNode.paddingLeft) {
    //     style.width = style.width + parentNode.paddingLeft;
    //     style.paddingLeft = parentNode.paddingLeft;
    //   }
    // }

    // THERE IS NOT AUTOLAYOUT
  } else {
    style = { ...style, ...node.absoluteBoundingBox };
    style.positionType = "absolute";

    if (!parentBox) {
      // This is the root
      style.positionTop = 0;
    } else if (node.constraints.vertical == "TOP") {
      style.positionTop = nodeBox.y - parentBox.y;
    } else if (node.constraints.vertical == "BOTTOM") {
      style.positionBottom =
        parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
      parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
    } else if (node.constraints.vertical == "TOP_BOTTOM") {
      style.positionTop = nodeBox.y - parentBox.y;
      style.positionBottom =
        parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
    } else if (node.constraints.vertical == "CENTER") {
      style.positionTop = nodeBox.y - parentBox.y;
    } else if (node.constraints.vertical == "SCALE") {
      style.positionTop = nodeBox.y - parentBox.y;
    }

    if (!parentBox) {
      // This is the root
      style.positionLeft = 0;
    } else if (node.constraints.horizontal == "LEFT") {
      style.positionLeft = nodeBox.x - parentBox.x;
    } else if (node.constraints.horizontal == "RIGHT") {
      style.positionRight =
        parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
    } else if (node.constraints.horizontal == "LEFT_RIGHT") {
      const l = nodeBox.x - parentBox.x;
      const r = parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
      style.positionLeft = l;
      style.positionRight = r;
      style.width = (nodeBox.width / parentBox.width) * 100 + "%";
    } else if (node.constraints.horizontal == "CENTER") {
      style.positionLeft =
        ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
    } else if (node.constraints.horizontal == "SCALE") {
      style.positionLeft =
        ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
    }
  }

  // Padding ann inner component props
  // switch (node.layoutAlign) {
  //   case "STRETCH":
  //     style.justifyContent = "space-between";
  //     break;
  // }

  // // Issue with padding: it pushes the background fill in, need to do padding in another container

  // style.paddingTop = node.paddingTop;
  // style.paddingBottom = node.paddingBottom;
  // style.paddingLeft = node.paddingLeft;
  // style.paddingRight = node.paddingRight;

  // if (node.layoutMode == "VERTICAL") {
  //   style.flexDirection = "column";
  // } else if (node.layoutMode == "HORIZONTAL") {
  //   style.flexDirection = "row";
  //   // style.width="100%"
  // }

  // // Figma's alignment to Yoga's alignItems
  // if (node.primaryAxisAlignItems) {
  //   switch (node.primaryAxisAlignItems) {
  //     case "MIN":
  //       style.alignItems = "flex-start";
  //       break;
  //     case "MAX":
  //       style.alignItems = "flex-end";
  //       break;
  //     case "CENTER":
  //       style.alignItems = "center";
  //       style.justifyContent = "center";
  //       style.borderColor = "#393";
  //       break;
  //     case "SPACE_BETWEEN":
  //       style.alignItems = "space-between";
  //       style.justifyContent = "space-between";
  //       break;
  //   }
  // }

  return style;
}
