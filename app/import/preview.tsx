"use client";
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
// import { staticLayoutData } from "./layoutData";

export default function Preview({ ...props }) {
  // layoutData = staticLayoutData;
  // if (!layoutData) return <></>;
  const { token, nodeId, fileId } = useFigmaContext();
  const hasScene = nodeId && fileId ? true : false;
  const [fullscreen, setFullscreen] = useState(true);

  const [layoutData, setLayoutData] = useState<null | any>(null);
  const [loaded, setLoaded] = useState(false);
  const [rootNode, setRootNode] = useState(null);
  useEffect(() => {
    // setLoaded(false);
    if (token && fileId && nodeId) {
      console.log("start import", token, fileId, nodeId);
      importFigma(token, fileId, nodeId);
    } else {
      setLayoutData(null);
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
    <>
      <Canvas
        style={{ height: "100%", touchAction: "none" }}
        gl={{ localClippingEnabled: true }}
      >
        {/* {!hasScene && (
          <>
            <mesh>
              <meshBasicMaterial color="#f09" />
              <sphereGeometry />
            </mesh>
            <OrbitControls />
          </>
        )} */}
        <Fullscreen>
          <UI
            key="ui"
            onSwitch={(fullscreen) => {
              console.log("fullscreen", fullscreen);
              setFullscreen(fullscreen);
            }}
            onImport={() => console.log("import")}
            isLoaded={loaded}
          />
          {fullscreen && (
            <Scene key={1} layoutData={layoutData} isFullscreen={fullscreen} />
          )}
        </Fullscreen>
        {!fullscreen && (
          <>
            <Scene key={2} layoutData={layoutData} isFullscreen={fullscreen} />
            <OrbitControls />
          </>
        )}
      </Canvas>
    </>
  );
}

function Scene({ isFullscreen, layoutData, ...props }) {
  if (!layoutData) return <></>;
  const rootNode = layoutData.nodes[Object.keys(layoutData.nodes)[0]].document;

  // // Turn layout JSON into TSX
  // useEffect(() => {
  //   const layoutText = figmaLayerText({
  //     node: rootNode,
  //     key: "rootNode",
  //     layoutData,
  //     width: "100%",
  //     height: "100%",
  //     overflow: "scroll",
  //   });
  //   let sceneString = `
  //   import { Root, Fullscreen, Container, Text, Image, Content } from "@react-three/uikit";
  //   export default function Layout(){`;
  //   if (fullscreen) {
  //     sceneString += `return (<Fullscreen>
  //         ${layoutText}
  //        </Fullscreen>`;
  //   } else {
  //     sceneString += `return (<Root
  //       pixelSize={0.01}
  //       sizeX={${rootNode.absoluteBoundingBox.width / 100}}
  //       sizeY={${rootNode.absoluteBoundingBox.height / 100}}
  //     >
  //       ${layoutText}
  //     </Root>`;
  //   }
  //   sceneString += `)}`;
  //   // console.log("sceneString", sceneString);
  //   handleStringOutput(sceneString);
  //   // window._sceneString = sceneString;
  // }, [layoutData]);

  // TODO: Fix UI, its not responsive after running the import, probably the UI is mucked up some how
  if (!layoutData || !rootNode) {
    return <></>;
  }
  if (isFullscreen) {
    return (
      // <Fullscreen>
      <FigmaLayer
        key={"rootNode"}
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
          <FigmaLayer node={rootNode} layoutData={layoutData} key="rootNode" />
        </Root>
        <Environment background blur={1} preset="city" />
      </>
    );
  }
}

function FigmaLayer({
  node,
  parentNode = null,
  asString = false,
  layoutData = { images: {}, flatNodeImages: {} },
  ...props
}) {
  const propsFromNode = figProps(node, parentNode);

  // console.log("propsFromNode", propsFromNode);

  const [width, setWidth] = useState(propsFromNode.width);
  const [height, setHeight] = useState(propsFromNode.height);

  let component;

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

    // REMOVED: Because padding pushes these fill layers in
    // TODO: Figure out how to do multiple fills, just use 1 for now
    // Fill layers if ther's' fills
    if (node.fills) {
      //   // For any gradient or image, we need to flatten them, and just have 1 background

      const nodeFills = node.fills.map((fill, i) => {
        if (fill.type !== "SOLID" && !node.children) {
          // console.log("got non solid fill");

          return (
            // <Container
            //   width={"100%"}
            //   height={"100%"}
            //   positionType="absolute"
            //   zIndexOffset={-1}
            //   {...figFillProps(fill, node)}
            // >
            <Image
              key={node.id + "_fill_" + i}
              width={"100%"}
              height={"100%"}
              {...figImageProps(fill, node, layoutData.flatNodeImages[node.id])}
            ></Image>
            // </Container>
          );
        }
        // else {
        //   return (
        //     <Container
        //       width={"100%"}
        //       height={"100%"}
        //       positionType="absolute"
        //       zIndexOffset={-1}
        //       {...figFillProps(fill, node)}
        //     ></Container>
        //   );
        // }
      });
      nodeChildren = nodeChildren.concat(nodeFills);
    }

    component = (
      <Container {...propsFromNode} {...props} key={node.id + "-container"}>
        {nodeChildren}
      </Container>
    );
  } else if (node.type == "TEXT") {
    component = (
      <Container key={node.id + "-container"} {...propsFromNode}>
        <Text key={node.id + "-text"} {...figTextProps(node)}>
          {node.characters}
        </Text>
      </Container>
    );
  }
  // console.log("figprops", node.name, propsFromNode);
  // {node.type == "TEXT" && <Text>{node.characters}</Text>}

  return component;
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
  asString = false,
  layoutData = { images: {}, flatNodeImages: {} },
  ...props
}) {
  const propsFromNode = figProps(node, parentNode);

  let component;

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

    // Fill layers if ther's' fills
    if (node.fills) {
      const nodeFills = node.fills.map((fill, i) => {
        if (fill.type !== "SOLID" && !node.children) {
          // console.log("string fill", layoutData.flatNodeImages[node.id]);
          return `<Image
            {...${JSON.stringify(figImageProps(fill, node, layoutData.flatNodeImages[node.id]))}}
            ></Image>`;
        }
        // else {
        //   return `<Container
        //   width={"100%"}
        //   height={"100%"}
        //   positionType="absolute"
        //   zIndexOffset={-1}
        //   {...${JSON.stringify(figFillProps(fill, node))}}
        //   ></Container>`;
        // }
      });
      nodeChildren = nodeChildren.concat(nodeFills);
    }

    component = `
      <Container
        key={"${node.name}"}
        {...${JSON.stringify(propsFromNode)}} {...${JSON.stringify(props)}}
      >${nodeChildren.join("\n")}</Container>`;
  } else if (node.type == "TEXT") {
    component = `
      <Container
        key={"${node.name}-container"}
        {...${JSON.stringify(propsFromNode)}}
      >
        <Text key={"${node.name}-text"}
        {...${JSON.stringify(figTextProps(node))}}>
          ${node.characters}
        </Text>
      </Container>
    `;
  }

  return component;
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

function figFillProps(fill, node) {
  let props: any = {
    backgroundOpacity: fill.opacity ? fill.opacity : 1,
    borderRadius: node.cornerRadius ? node.cornerRadius : 0,
  };

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
    overflow: node.clipsContent ? "hidden" : "visible",
  };

  //   let reactStyle = {};
  for (const key in node) {
    if (propertyMappings[key]) {
      props[propertyMappings[key]] = node[key];
    }
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
  if (
    node.type == "FRAME" ||
    node.type == "IMAGE" ||
    node.type == "RECTANGLE" ||
    node.type == "GROUP"
  ) {
    const fill = node.fills.find((element) => element.type == "SOLID");
    if (fill) {
      props.backgroundColor = figColor(fill.color);
      props.backgroundOpacity = fill.opacity;
    }
  }

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

function translateFigmaConstraintsToReact(node, parentNode) {
  let style: any = {};
  const nodeBox = node.absoluteBoundingBox;
  const parentBox = parentNode?.absoluteBoundingBox;

  // props.positionLeft =
  //   node.absoluteRenderBounds.x - parentNode.absoluteBoundingBox.x;
  // props.positionTop =
  //   node.absoluteRenderBounds.y - parentNode.absoluteBoundingBox.y;

  if (parentNode) {
    // There IS auto layout
    if (parentNode.layoutMode) {
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
    } else {
      style = { ...style, ...node.absoluteBoundingBox };
      style.positionType = "absolute";
      switch (node.constraints.vertical) {
        case "TOP":
          style.positionTop = nodeBox.y - parentBox.y;
          break;
        case "BOTTOM":
          style.positionBottom =
            parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
          break;
        case "TOP_BOTTOM":
          style.positionTop = nodeBox.y - parentBox.y;
          style.positionBottom =
            parentBox.height - (nodeBox.y - parentBox.y + nodeBox.height);
          break;
        case "CENTER":
          style.positionTop = nodeBox.y - parentBox.y;
          // ((nodeBox.y - parentBox.y) / parentBox.height) * 100 + "%";
          break;
        case "SCALE":
          style.positionTop = nodeBox.y - parentBox.y;
          // ((nodeBox.y - parentBox.y) / parentBox.height) * 100 + "%";
          break;
        // Centering and other cases can be added if necessary
      }

      switch (node.constraints.horizontal) {
        case "LEFT":
          style.positionLeft = nodeBox.x - parentBox.x;
          break;
        case "RIGHT":
          style.positionRight =
            parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
          break;
        case "LEFT_RIGHT":
          const l = nodeBox.x - parentBox.x;
          const r = parentBox.width - (nodeBox.x - parentBox.x + nodeBox.width);
          style.positionLeft = l;
          style.positionRight = r;
          style.width = (nodeBox.width / parentBox.width) * 100 + "%";
          break;
        case "CENTER":
          style.positionLeft =
            ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
          break;
        case "SCALE":
          style.positionLeft =
            ((nodeBox.x - parentBox.x) / parentBox.width) * 100 + "%";
          break;
        // Centering and other cases can be added if necessary
      }
    }
  }

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
        style.borderColor = "#393";
        break;
      case "SPACE_BETWEEN":
        style.alignItems = "space-between";
        style.justifyContent = "space-between";
        break;
    }
  }

  return style;
}
