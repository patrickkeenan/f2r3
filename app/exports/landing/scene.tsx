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
                        "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/992e15f4-9e71-4aca-965d-dc8959398456"
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
                              alignContent: "stretch",
                              alignSelf: "stretch",
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
                              can preview it in the browser, headset, and then
                              take the code and build out your full experience.
                              Leveraging @react-three/uikit, you can build out
                              fully interactive and very fast interactions.
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
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          type: "VECTOR",
                          x: -4826.580154418945,
                          y: 4645.16015625,
                          width: 69.91999816894531,
                          height: 51.29999923706055,
                          positionType: "absolute",
                          positionTop: 88.16015625,
                          positionLeft: "41.727235784941314%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/48326255-369b-4372-abde-80f0fef52459"
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
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a7f22cdb-ddc7-4767-adc8-b35770a600b3"
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
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3e802cef-459b-4a07-a767-a3a06d88156a"
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
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2953d0a6-cb11-408a-b4fb-f35490e73fc9"
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
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d2a760bc-92a9-4279-8442-ee008a82b39d"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          type: "VECTOR",
                          x: -4847.85986328125,
                          y: 4807.7998046875,
                          width: 47.5,
                          height: 51.68000030517578,
                          positionType: "absolute",
                          positionTop: 250.7998046875,
                          positionLeft: "36.636396344198566%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c6cbda83-992f-4e71-8487-3bde6ce83e53"
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
