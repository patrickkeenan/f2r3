import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
} from "@react-three/uikit";
export default function Layout() {
  return (
    <Root pixelSize={0.01} sizeX={10.15} sizeY={5.78}>
      <Container
        {...{
          borderRadius: 40,
          type: "FRAME",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        {
          <Container
            {...{
              key: "47:6280_fill_0",
              backgroundOpacity: 1,
              borderRadius: 40,
              flexGrow: 1,
              alignSelf: "stretch",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}
          >
            {
              <Container
                key={"Header"}
                {...{
                  type: "FRAME",
                  positionTop: 0,
                  positionLeft: 0,
                  positionRight: 0,
                  positionBottom: 0,
                  positionType: "absolute",
                  width: "100%",
                  height: "100%",
                  overflow: "scroll",
                  flexWrap: "no-wrap",
                }}
                {...{}}
              >
                <Container
                  {...{
                    type: "FRAME",
                    x: -5138,
                    y: 4483,
                    width: 103,
                    height: 44,
                    positionType: "absolute",
                    positionTop: 48,
                    positionLeft: "44.926108374384235%",
                  }}
                >
                  {
                    <Image
                      src={
                        "/import-screen/52873f15-234e-4358-a813-9fbbf3bec6c1.png"
                      }
                      borderRadius={0}
                    />
                  }
                </Container>
                <Container
                  {...{
                    type: "FRAME",
                    minWidth: 350,
                    maxWidth: 500,
                    gap: 24,
                    x: -5514,
                    y: 4611,
                    width: 452,
                    height: 301,
                    positionType: "absolute",
                    positionTop: 176,
                    positionLeft: "7.8817733990147785%",
                  }}
                >
                  {
                    <Container
                      key={"PKBlurb"}
                      {...{
                        type: "FRAME",
                        gap: 24,
                        flexDirection: "column",
                        flexWrap: "no-wrap",
                        justifyContent: "center",
                      }}
                      {...{}}
                    >
                      <Container
                        {...{
                          type: "TEXT",
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={"PROTOTYPING IN THREE DIMENSIONS-container"}
                            {...{
                              type: "TEXT",
                              justifyContent: "space-between",
                              alignContent: "stretch",
                              alignSelf: "stretch",
                              flexWrap: "no-wrap",
                            }}
                          >
                            <Text
                              key={"PROTOTYPING IN THREE DIMENSIONS-text"}
                              {...{
                                fontWeight: 700,
                                fontSize: 14,
                                letterSpacing: 1,
                                color: "rgba(0, 0, 0, 1)",
                                lineHeight: 1.2102272851126534,
                                horizontalAlign: "left",
                                verticalAlign: "top",
                              }}
                            >
                              PROTOTYPING IN THREE DIMENSIONS
                            </Text>
                          </Container>
                        }
                      </Container>
                      <Container
                        {...{
                          type: "TEXT",
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={"From canvas to world in a click-container"}
                            {...{
                              type: "TEXT",
                              justifyContent: "space-between",
                              alignContent: "stretch",
                              alignSelf: "stretch",
                              flexWrap: "no-wrap",
                            }}
                          >
                            <Text
                              key={"From canvas to world in a click-text"}
                              {...{
                                fontWeight: 600,
                                fontSize: 52,
                                letterSpacing: 0,
                                color: "rgba(0, 0, 0, 1)",
                                lineHeight: 1.2102272327129657,
                                horizontalAlign: "left",
                                verticalAlign: "top",
                              }}
                            >
                              From canvas to world in a click
                            </Text>
                          </Container>
                        }
                      </Container>
                      <Container
                        {...{
                          type: "TEXT",
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={
                              "F2R3 makes it easy to see your Figma UI in 3D. You can preview it in the browser, headset, and then take the code and build out your full experience. Leveraging @react-three/uikit, you can build out fully interactive and very fast interactions.-container"
                            }
                            {...{
                              type: "TEXT",
                              justifyContent: "space-between",
                              alignContent: "flex-start",

                              flexWrap: "no-wrap",
                            }}
                          >
                            <Text
                              key={
                                "F2R3 makes it easy to see your Figma UI in 3D. You can preview it in the browser, headset, and then take the code and build out your full experience. Leveraging @react-three/uikit, you can build out fully interactive and very fast interactions.-text"
                              }
                              {...{
                                fontWeight: 500,
                                fontSize: 18,
                                letterSpacing: 0,
                                color: "rgba(0, 0, 0, 1)",
                                lineHeight: 1.2102272245619032,
                                horizontalAlign: "left",
                                verticalAlign: "top",
                              }}
                            >
                              F2R3 makes it easy to see your Figma UI in 3D. You
                              can preview it in the browser, headset. Use a * to
                              flatten layers. Use a 0% dropshadow for z depth.
                            </Text>
                            <Text
                              {...{
                                fontWeight: 500,
                                fontSize: 18,
                                letterSpacing: 0,
                                color: "rgba(0, 0, 0, 1)",
                                lineHeight: 1.2102272245619032,
                                horizontalAlign: "left",
                                verticalAlign: "top",
                                borderBottom: 1,
                                borderColor: "#ddd",
                                positionType: "static",
                                width: "auto",
                                alignSelf: "flex-start",
                                cursor: "pointer",
                                marginTop: 12,
                                hover: {
                                  borderColor: "#000",
                                },
                              }}
                              onClick={() =>
                                window.open(
                                  "https://www.figma.com/community/file/1358278207724997509/f2r3-starter"
                                )
                              }
                            >
                              Get the starter file
                            </Text>
                            <Text
                              {...{
                                fontWeight: 500,
                                fontSize: 18,
                                letterSpacing: 0,
                                color: "rgba(0, 0, 0, 1)",
                                lineHeight: 1.2102272245619032,
                                horizontalAlign: "left",
                                verticalAlign: "top",
                                borderBottom: 1,
                                borderColor: "#ddd",
                                positionType: "static",
                                width: "auto",
                                alignSelf: "flex-start",
                                cursor: "pointer",
                                marginTop: 12,
                                hover: {
                                  borderColor: "#000",
                                },
                              }}
                              onClick={() =>
                                window.open(
                                  "https://github.com/patrickkeenan/f2r3"
                                )
                              }
                            >
                              Checkout the readme
                            </Text>
                          </Container>
                        }
                      </Container>
                    </Container>
                  }
                </Container>
                <Container
                  {...{
                    type: "FRAME",
                    x: -5001,
                    y: 4557,
                    width: 418,
                    height: 418,
                    positionType: "absolute",
                    positionTop: 122,
                    positionLeft: "58.423645320197046%",
                  }}
                >
                  {
                    <Container
                      key={"Frame 7"}
                      {...{ type: "FRAME", flexWrap: "no-wrap" }}
                      {...{}}
                    >
                      <Container
                        {...{
                          type: "FRAME",
                          x: -4857,
                          y: 4800,
                          width: 66,
                          height: 67,
                          positionType: "absolute",
                          positionTop: 243,
                          positionLeft: "34.44976076555024%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/1458ab6b-b74d-47f2-ba97-9d1589f8459d.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -4972.5,
                          y: 4752.31982421875,
                          width: 131.47999572753906,
                          height: 133.75999450683594,
                          positionType: "absolute",
                          positionTop: 195.31982421875,
                          positionLeft: "6.8181818181818175%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/30873659-cd6d-46a4-9b73-90f91652dd19.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -4973.259765625,
                          y: 4585.1201171875,
                          width: 154.27999877929688,
                          height: 133.75999450683594,
                          positionType: "absolute",
                          positionTop: 28.1201171875,
                          positionLeft: "6.636419706937799%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/6d1d2c45-de80-446a-99a3-b76430fc9265.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          transformTranslateZ: 40,
                          transformTranslateX: 0,
                          x: -4765.02001953125,
                          y: 4621.60009765625,
                          width: 132.24000549316406,
                          height: 133.75999450683594,
                          positionType: "absolute",
                          positionTop: 64.60009765625,
                          positionLeft: "56.45454078199761%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/54d46294-a06f-47c3-b284-494321858ca7.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          transformTranslateZ: 40,
                          transformTranslateX: 0,
                          x: -4801.1201171875,
                          y: 4774.35986328125,
                          width: 143.63999938964844,
                          height: 165.67999267578125,
                          positionType: "absolute",
                          positionTop: 217.35986328125,
                          positionLeft: "47.81815378289473%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/ca6b3ea3-ce2a-4fb1-bf5e-3d378d6ee4e5.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -4833,
                          y: 4647,
                          width: 80,
                          height: 58,
                          positionType: "absolute",
                          positionTop: 90,
                          positionLeft: "40.19138755980861%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "/import-screen/9f4b8ed3-822a-4088-b5e8-ef1edc6bc7ca.png"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                    </Container>
                  }
                </Container>
              </Container>
            }
          </Container>
        }
      </Container>
    </Root>
  );
}
