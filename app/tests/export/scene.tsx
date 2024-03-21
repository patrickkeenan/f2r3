import { useState } from "react";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Image,
  Content,
} from "@react-three/uikit";
export default function Layout() {
  const [on, setOn] = useState(false);
  return (
    <Root pixelSize={0.01} sizeX={4.39} sizeY={3.63}>
      {on && (
        <Container
          {...{
            type: "FRAME",
            borderRadius: 28,
            overflow: "hidden",
            x: 222,
            y: -974,
            width: "100%",
            height: "100%",
            positionType: "absolute",
            positionTop: 0,
            positionLeft: 0,
          }}
        >
          {
            <Container
              {...{
                key: "10:299_fill_0",
                backgroundOpacity: 1,
                borderRadius: 28,
                flexGrow: 1,
                backgroundColor: "rgba(255, 0, 0, 1)",
              }}
            >
              {
                <Container
                  key={"Layout Test"}
                  {...{ flexGrow: 1, type: "FRAME" }}
                  {...{ width: "100%", height: "100%", overflow: "scroll" }}
                >
                  <Container
                    {...{
                      type: "FRAME",
                      gap: 8,
                      x: 254,
                      y: -880.5,
                      width: "85.42141230068337%",
                      height: 148,
                      positionType: "absolute",
                      positionTop: 93.5,
                      positionLeft: 32,
                      positionRight: 32,
                    }}
                  >
                    {
                      <Container
                        key={"Rows"}
                        {...{
                          flexGrow: 1,
                          type: "FRAME",
                          gap: 8,
                          flexDirection: "column",
                        }}
                        {...{}}
                      >
                        {on && (
                          <Container
                            {...{
                              type: "FRAME",
                              gap: 24,
                              positionType: "static",
                              flexGrow: 1,
                            }}
                          >
                            {
                              <Container
                                key={"Row 1"}
                                {...{
                                  flexGrow: 1,
                                  type: "FRAME",
                                  gap: 24,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "flex-end",
                                }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:312_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                        // hover: {
                                        //   backgroundOpacity: 1,
                                        //   transformTranslateZ: 10,
                                        // },
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 01"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"FILL-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"FILL-text"}
                                                  {...{
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.3935546875,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  FILL
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:314_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 02"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"2-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"2-text"}
                                                  {...{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.193359375,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  2
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:316_fill_1",
                                        backgroundOpacity: 0.4000000059604645,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(5, 255, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          {...{
                                            key: "10:316_fill_0",
                                            backgroundOpacity: 0.5,
                                            borderRadius: 20,
                                            flexGrow: 1,
                                            backgroundColor: "rgba(0, 0, 0, 1)",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"Item 03"}
                                              {...{
                                                flexGrow: 1,
                                                type: "FRAME",
                                                gap: 4,
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                              {...{}}
                                            >
                                              <Container
                                                {...{
                                                  type: "TEXT",
                                                  positionType: "static",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    key={"3-container"}
                                                    {...{
                                                      flexGrow: 1,
                                                      type: "TEXT",
                                                    }}
                                                  >
                                                    <Text
                                                      key={"3-text"}
                                                      {...{
                                                        fontWeight: 600,
                                                        fontSize: 16,
                                                        letterSpacing: 0,
                                                        color:
                                                          "rgba(255, 255, 255, 1)",
                                                        lineHeight: 1.193359375,
                                                        horizontalAlign:
                                                          "center",
                                                        verticalAlign: "top",
                                                      }}
                                                    >
                                                      3
                                                    </Text>
                                                  </Container>
                                                }
                                              </Container>
                                            </Container>
                                          }
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        )}
                        {!on && (
                          <Container
                            {...{
                              type: "FRAME",
                              gap: 24,
                              positionType: "static",
                              flexGrow: 1,
                            }}
                          >
                            {
                              <Container
                                key={"Row 1"}
                                {...{
                                  flexGrow: 1,
                                  type: "FRAME",
                                  gap: 24,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "flex-end",
                                }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:312_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(255, 0, 255, 1)",
                                        // hover: {
                                        //   backgroundOpacity: 1,
                                        //   transformTranslateZ: 10,
                                        // },
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 01"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"FILL-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"FILL-text"}
                                                  {...{
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.3935546875,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  FILL
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:314_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 02"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"2-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"2-text"}
                                                  {...{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.193359375,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  2
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:316_fill_1",
                                        backgroundOpacity: 0.4000000059604645,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(5, 255, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          {...{
                                            key: "10:316_fill_0",
                                            backgroundOpacity: 0.5,
                                            borderRadius: 20,
                                            flexGrow: 1,
                                            backgroundColor: "rgba(0, 0, 0, 1)",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"Item 03"}
                                              {...{
                                                flexGrow: 1,
                                                type: "FRAME",
                                                gap: 4,
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                              {...{}}
                                            >
                                              <Container
                                                {...{
                                                  type: "TEXT",
                                                  positionType: "static",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    key={"3-container"}
                                                    {...{
                                                      flexGrow: 1,
                                                      type: "TEXT",
                                                    }}
                                                  >
                                                    <Text
                                                      key={"3-text"}
                                                      {...{
                                                        fontWeight: 600,
                                                        fontSize: 16,
                                                        letterSpacing: 0,
                                                        color:
                                                          "rgba(255, 255, 255, 1)",
                                                        lineHeight: 1.193359375,
                                                        horizontalAlign:
                                                          "center",
                                                        verticalAlign: "top",
                                                      }}
                                                    >
                                                      3
                                                    </Text>
                                                  </Container>
                                                }
                                              </Container>
                                            </Container>
                                          }
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        )}
                        <Container
                          {...{
                            type: "FRAME",
                            gap: 1,
                            positionType: "static",
                            flexGrow: 1,
                            height: 75,
                          }}
                        >
                          {
                            <Container
                              {...{
                                key: "36:340_stroke_0",
                                borderOpacity: 1,
                                border: 1,
                                borderRadius: 0,
                                flexGrow: 1,
                                borderColor: "rgba(255, 255, 255, 1)",
                              }}
                            >
                              {
                                <Container
                                  key={"Row 3"}
                                  {...{
                                    flexGrow: 1,
                                    type: "FRAME",
                                    gap: -10,
                                    // gapRow: 1,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "space-between",
                                  }}
                                  {...{}}
                                >
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      overflow: "hidden",
                                      positionType: "static",
                                      width: 92,
                                      transformTranslateZ: 24,
                                      transformTranslateX: -20,
                                      border: 1,
                                      borderColor: "#fff",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:341_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Item 01"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"FIXED-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"FIXED-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    FIXED
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      overflow: "hidden",
                                      positionType: "static",
                                      width: 92,
                                      transformTranslateZ: 4,
                                      transformTranslateX: 0,
                                      border: 1,
                                      borderColor: "#fff",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:343_stroke_0",
                                          borderOpacity: 1,
                                          border: 7,
                                          borderRadius: 27,
                                          flexGrow: 1,
                                          borderColor: "rgba(0, 255, 10, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            {...{
                                              key: "36:343_fill_0",
                                              backgroundOpacity: 0.5,
                                              borderRadius: 20,
                                              flexGrow: 1,
                                              backgroundColor:
                                                "rgba(0, 163, 255, 1)",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"Item 02"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "FRAME",
                                                  gap: 4,
                                                  paddingTop: 4,
                                                  paddingBottom: 4,
                                                  paddingLeft: 30,
                                                  paddingRight: 30,
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                                {...{}}
                                              >
                                                <Container
                                                  {...{
                                                    type: "TEXT",
                                                    positionType: "static",
                                                  }}
                                                >
                                                  {
                                                    <Container
                                                      key={"STROKE-container"}
                                                      {...{
                                                        flexGrow: 1,
                                                        type: "TEXT",
                                                      }}
                                                    >
                                                      <Text
                                                        key={"STROKE-text"}
                                                        {...{
                                                          fontWeight: 600,
                                                          fontSize: 16,
                                                          letterSpacing: 0,
                                                          color:
                                                            "rgba(151, 176, 2, 1)",
                                                          lineHeight: 1.193359375,
                                                          horizontalAlign:
                                                            "center",
                                                          verticalAlign: "top",
                                                        }}
                                                        onPointerUp={(e) => {
                                                          console.log(!on);
                                                          setOn(!on);
                                                          return false;
                                                        }}
                                                      >
                                                        STROKE
                                                      </Text>
                                                    </Container>
                                                  }
                                                </Container>
                                              </Container>
                                            }
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      positionType: "static",
                                      width: 92,
                                      // transformTranslateZ: 16,
                                      // transformTranslateX: 16,
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:345_stroke_2",
                                          borderOpacity: 0.4000000059604645,
                                          border: 1,
                                          borderRadius: 21,
                                          flexGrow: 1,
                                          borderColor: "rgba(0, 10, 255, 1)",
                                          marginLeft: -1,
                                          marginRight: -1,
                                          marginTop: -1,
                                          marginBottom: -1,
                                        }}
                                      >
                                        {
                                          <Container
                                            {...{
                                              key: "36:345_stroke_1",
                                              borderOpacity: 0.6000000238418579,
                                              border: 1,
                                              borderRadius: 21,
                                              flexGrow: 1,
                                              borderColor:
                                                "rgba(255, 214, 0, 1)",
                                            }}
                                          >
                                            {
                                              <Container
                                                {...{
                                                  key: "36:345_stroke_0",
                                                  borderOpacity: 0.5,
                                                  border: 1,
                                                  borderRadius: 21,
                                                  flexGrow: 1,
                                                  borderColor:
                                                    "rgba(20, 148, 235, 1)",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    {...{
                                                      key: "36:345_fill_0",
                                                      backgroundOpacity: 0.5,
                                                      borderRadius: 20,
                                                      flexGrow: 1,
                                                      backgroundColor:
                                                        "rgba(0, 0, 0, 1)",
                                                    }}
                                                  >
                                                    {
                                                      <Container
                                                        key={"Item 03"}
                                                        {...{
                                                          flexGrow: 1,
                                                          type: "FRAME",
                                                          gap: 4,
                                                          paddingTop: 4,
                                                          paddingBottom: 4,
                                                          flexDirection:
                                                            "column",
                                                          justifyContent:
                                                            "center",
                                                          alignItems: "center",
                                                        }}
                                                        {...{}}
                                                      >
                                                        <Container
                                                          {...{
                                                            type: "FRAME",
                                                            borderRadius: 20,
                                                            gap: 4,
                                                            overflow: "hidden",
                                                            positionType:
                                                              "static",
                                                            width: 18,
                                                          }}
                                                        >
                                                          {
                                                            <Container
                                                              {...{
                                                                key: "130:89_stroke_0",
                                                                borderOpacity: 1,
                                                                border: 1,
                                                                borderRadius: 21,
                                                                flexGrow: 1,
                                                                borderColor:
                                                                  "rgba(0, 0, 0, 1)",
                                                              }}
                                                            >
                                                              {
                                                                <Container
                                                                  {...{
                                                                    key: "130:89_fill_1",
                                                                    backgroundOpacity: 0.4000000059604645,
                                                                    borderRadius: 20,
                                                                    flexGrow: 1,
                                                                    backgroundColor:
                                                                      "rgba(5, 255, 0, 1)",
                                                                  }}
                                                                >
                                                                  {
                                                                    <Container
                                                                      {...{
                                                                        key: "130:89_fill_0",
                                                                        backgroundOpacity: 0.5,
                                                                        borderRadius: 20,
                                                                        flexGrow: 1,
                                                                        backgroundColor:
                                                                          "rgba(0, 0, 0, 1)",
                                                                      }}
                                                                    >
                                                                      {
                                                                        <Container
                                                                          key={
                                                                            "Frame 8"
                                                                          }
                                                                          {...{
                                                                            flexGrow: 1,
                                                                            type: "FRAME",
                                                                            gap: 4,
                                                                            paddingTop: 4,
                                                                            paddingBottom: 4,
                                                                            paddingLeft: 30,
                                                                            paddingRight: 30,
                                                                            flexDirection:
                                                                              "column",
                                                                            justifyContent:
                                                                              "center",
                                                                            alignItems:
                                                                              "center",
                                                                          }}
                                                                          {...{}}
                                                                        ></Container>
                                                                      }
                                                                    </Container>
                                                                  }
                                                                </Container>
                                                              }
                                                            </Container>
                                                          }
                                                        </Container>
                                                      </Container>
                                                    }
                                                  </Container>
                                                }
                                              </Container>
                                            }
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                </Container>
                              }
                            </Container>
                          }
                        </Container>
                        <Container
                          {...{
                            type: "FRAME",
                            gap: 35,
                            positionType: "static",
                            flexGrow: 1,
                          }}
                        >
                          {
                            <Container
                              key={"Row 2"}
                              {...{
                                flexGrow: 1,
                                type: "FRAME",
                                gap: 35,
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                alignItems: "flex-end",
                              }}
                              {...{}}
                            >
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                  width: 69,
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:307_fill_0",
                                      backgroundOpacity: 0.5,
                                      borderRadius: 20,
                                      flexGrow: 1,
                                      backgroundColor: "rgba(0, 0, 0, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        key={"Second Item 01"}
                                        {...{
                                          flexGrow: 1,
                                          type: "FRAME",
                                          gap: 4,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          paddingLeft: 30,
                                          paddingRight: 30,
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                        {...{}}
                                      >
                                        <Container
                                          {...{
                                            type: "TEXT",
                                            positionType: "static",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"HUG-container"}
                                              {...{ flexGrow: 1, type: "TEXT" }}
                                            >
                                              <Text
                                                key={"HUG-text"}
                                                {...{
                                                  fontWeight: 600,
                                                  fontSize: 16,
                                                  letterSpacing: 0,
                                                  color:
                                                    "rgba(255, 255, 255, 1)",
                                                  lineHeight: 1.193359375,
                                                  horizontalAlign: "center",
                                                  verticalAlign: "top",
                                                }}
                                              >
                                                HUG
                                              </Text>
                                            </Container>
                                          }
                                        </Container>
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                  width: 71,
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:308_stroke_0",
                                      borderOpacity: 1,
                                      border: 1,
                                      borderRadius: 21,
                                      flexGrow: 1,
                                      borderColor: "rgba(255, 0, 229, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "10:308_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Second Item 02"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"OUTER-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"OUTER-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    OUTER
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:309_stroke_0",
                                      borderOpacity: 1,
                                      border: 1,
                                      borderRadius: 21,
                                      flexGrow: 1,
                                      borderColor: "rgba(128, 0, 255, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "10:309_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Second Item 03"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"Center-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"Center-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    Center
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                            </Container>
                          }
                        </Container>
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      gap: 4,
                      overflow: "hidden",
                      x: 382.5,
                      y: -958,
                      width: 119,
                      height: 27,
                      positionType: "absolute",
                      positionTop: 16,
                      positionLeft: "36.56036446469248%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:325_fill_0",
                          backgroundOpacity: 0.5,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(0, 0, 0, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Top"}
                            {...{
                              flexGrow: 1,
                              type: "FRAME",
                              gap: 4,
                              paddingTop: 4,
                              paddingBottom: 4,
                              paddingLeft: 43,
                              paddingRight: 43,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            {...{}}
                          >
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"TOP-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"TOP-text"}
                                    {...{
                                      fontWeight: 900,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.193359375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    TOP
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      gap: 4,
                      overflow: "hidden",
                      x: 585,
                      y: -958,
                      width: 60,
                      height: 66,
                      positionType: "absolute",
                      positionTop: 16,
                      positionRight: 16,
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:330_fill_0",
                          backgroundOpacity: 1,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(23, 220, 144, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Top Right"}
                            {...{
                              flexGrow: 1,
                              type: "FRAME",
                              gap: 4,
                              paddingTop: 4,
                              paddingBottom: 4,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            {...{}}
                          >
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"ABS-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"ABS-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.13623046875,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    ABS
                                  </Text>
                                </Container>
                              }
                            </Container>
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"ABS-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"ABS-text"}
                                    {...{
                                      fontWeight: 600,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.193359375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    ABS
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      overflow: "hidden",
                      x: 238,
                      y: -958,
                      width: 64,
                      height: 64,
                      positionType: "absolute",
                      positionTop: 16,
                      positionLeft: "3.644646924829157%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:335_fill_1",
                          backgroundOpacity: 1,
                          borderRadius: 20,
                          flexGrow: 1,
                          color: { r: 0, g: 0, b: 0, a: 0 },
                          opacity: 0,
                        }}
                      >
                        {
                          <Container
                            {...{
                              key: "10:335_fill_0",
                              backgroundOpacity: 0.5,
                              borderRadius: 20,
                              flexGrow: 1,
                              backgroundColor: "rgba(0, 0, 0, 1)",
                            }}
                          >
                            {
                              <Container
                                key={"TopLeft"}
                                {...{ flexGrow: 1, type: "FRAME" }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    x: 256,
                                    y: -940,
                                    width: 28,
                                    height: 28,
                                    positionType: "absolute",
                                    positionTop: 18,
                                    positionLeft: "28.125%",
                                  }}
                                >
                                  {
                                    <Image
                                      {...{
                                        key: "10:339_fill_0",
                                        backgroundOpacity: 1,
                                        borderRadius: 8,
                                        flexGrow: 1,
                                      }}
                                      {...{
                                        src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f783614d-89a2-43ec-a7b4-aebe6f9f20c6",
                                        borderRadius: 8,
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"ClockIcon"}
                                          {...{ flexGrow: 1, type: "FRAME" }}
                                          {...{}}
                                        ></Container>
                                      }
                                    </Image>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      overflow: "hidden",
                      x: 383,
                      y: -656,
                      width: 118,
                      height: 29,
                      positionType: "absolute",
                      positionBottom: 16,
                      positionLeft: "36.674259681093396%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:327_fill_0",
                          backgroundOpacity: 0.5,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(0, 0, 0, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Bottom"}
                            {...{ flexGrow: 1, type: "FRAME" }}
                            {...{}}
                          >
                            <Container
                              {...{
                                type: "TEXT",
                                x: 407,
                                y: -651,
                                width: 70,
                                height: 18,
                                positionType: "absolute",
                                positionTop: 5,
                                positionLeft: 24,
                              }}
                            >
                              {
                                <Container
                                  key={"BOTTOM-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"BOTTOM-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.14990234375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    BOTTOM
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                </Container>
              }
            </Container>
          }
        </Container>
      )}
      {!on && (
        <Container
          {...{
            type: "FRAME",
            borderRadius: 28,
            overflow: "hidden",
            x: 222,
            y: -974,
            width: "100%",
            height: "100%",
            positionType: "absolute",
            positionTop: 0,
            positionLeft: 0,
          }}
        >
          {
            <Container
              {...{
                key: "10:299_fill_0",
                backgroundOpacity: 1,
                borderRadius: 28,
                flexGrow: 1,
                backgroundColor: "rgba(0, 0, 0, .5)",
              }}
            >
              {
                <Container
                  key={"Layout Test"}
                  {...{ flexGrow: 1, type: "FRAME" }}
                  {...{ width: "100%", height: "100%", overflow: "scroll" }}
                >
                  <Container
                    {...{
                      type: "FRAME",
                      gap: 8,
                      x: 254,
                      y: -880.5,
                      width: "85.42141230068337%",
                      height: 148,
                      positionType: "absolute",
                      positionTop: 93.5,
                      positionLeft: 32,
                      positionRight: 32,
                    }}
                  >
                    {
                      <Container
                        key={"Rows"}
                        {...{
                          flexGrow: 1,
                          type: "FRAME",
                          gap: 8,
                          flexDirection: "column",
                        }}
                        {...{}}
                      >
                        {on && (
                          <Container
                            {...{
                              type: "FRAME",
                              gap: 24,
                              positionType: "static",
                              flexGrow: 1,
                            }}
                          >
                            {
                              <Container
                                key={"Row 1"}
                                {...{
                                  flexGrow: 1,
                                  type: "FRAME",
                                  gap: 24,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "flex-end",
                                }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:312_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                        // hover: {
                                        //   backgroundOpacity: 1,
                                        //   transformTranslateZ: 10,
                                        // },
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 01"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"FILL-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"FILL-text"}
                                                  {...{
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.3935546875,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  FILL
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:314_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 02"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"2-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"2-text"}
                                                  {...{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.193359375,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  2
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:316_fill_1",
                                        backgroundOpacity: 0.4000000059604645,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(5, 255, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          {...{
                                            key: "10:316_fill_0",
                                            backgroundOpacity: 0.5,
                                            borderRadius: 20,
                                            flexGrow: 1,
                                            backgroundColor: "rgba(0, 0, 0, 1)",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"Item 03"}
                                              {...{
                                                flexGrow: 1,
                                                type: "FRAME",
                                                gap: 4,
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                              {...{}}
                                            >
                                              <Container
                                                {...{
                                                  type: "TEXT",
                                                  positionType: "static",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    key={"3-container"}
                                                    {...{
                                                      flexGrow: 1,
                                                      type: "TEXT",
                                                    }}
                                                  >
                                                    <Text
                                                      key={"3-text"}
                                                      {...{
                                                        fontWeight: 600,
                                                        fontSize: 16,
                                                        letterSpacing: 0,
                                                        color:
                                                          "rgba(255, 255, 255, 1)",
                                                        lineHeight: 1.193359375,
                                                        horizontalAlign:
                                                          "center",
                                                        verticalAlign: "top",
                                                      }}
                                                    >
                                                      3
                                                    </Text>
                                                  </Container>
                                                }
                                              </Container>
                                            </Container>
                                          }
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        )}
                        {!on && (
                          <Container
                            {...{
                              type: "FRAME",
                              gap: 24,
                              positionType: "static",
                              flexGrow: 1,
                            }}
                          >
                            {
                              <Container
                                key={"Row 1"}
                                {...{
                                  flexGrow: 1,
                                  type: "FRAME",
                                  gap: 24,
                                  justifyContent: "space-between",
                                  flexDirection: "row",
                                  alignItems: "flex-end",
                                }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:312_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(255, 0, 255, 1)",
                                        // hover: {
                                        //   backgroundOpacity: 1,
                                        //   transformTranslateZ: 10,
                                        // },
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 01"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"FILL-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"FILL-text"}
                                                  {...{
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.3935546875,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  FILL
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:314_fill_0",
                                        backgroundOpacity: 0.5,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(0, 0, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"Item 02"}
                                          {...{
                                            flexGrow: 1,
                                            type: "FRAME",
                                            gap: 4,
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            paddingLeft: 30,
                                            paddingRight: 30,
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}
                                          {...{}}
                                        >
                                          <Container
                                            {...{
                                              type: "TEXT",
                                              positionType: "static",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"2-container"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "TEXT",
                                                }}
                                              >
                                                <Text
                                                  key={"2-text"}
                                                  {...{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    letterSpacing: 0,
                                                    color:
                                                      "rgba(255, 255, 255, 1)",
                                                    lineHeight: 1.193359375,
                                                    horizontalAlign: "center",
                                                    verticalAlign: "top",
                                                  }}
                                                >
                                                  2
                                                </Text>
                                              </Container>
                                            }
                                          </Container>
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 20,
                                    gap: 4,
                                    overflow: "hidden",
                                    positionType: "static",
                                    flexGrow: 1,
                                  }}
                                >
                                  {
                                    <Container
                                      {...{
                                        key: "10:316_fill_1",
                                        backgroundOpacity: 0.4000000059604645,
                                        borderRadius: 20,
                                        flexGrow: 1,
                                        backgroundColor: "rgba(5, 255, 0, 1)",
                                      }}
                                    >
                                      {
                                        <Container
                                          {...{
                                            key: "10:316_fill_0",
                                            backgroundOpacity: 0.5,
                                            borderRadius: 20,
                                            flexGrow: 1,
                                            backgroundColor: "rgba(0, 0, 0, 1)",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"Item 03"}
                                              {...{
                                                flexGrow: 1,
                                                type: "FRAME",
                                                gap: 4,
                                                paddingTop: 4,
                                                paddingBottom: 4,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                              {...{}}
                                            >
                                              <Container
                                                {...{
                                                  type: "TEXT",
                                                  positionType: "static",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    key={"3-container"}
                                                    {...{
                                                      flexGrow: 1,
                                                      type: "TEXT",
                                                    }}
                                                  >
                                                    <Text
                                                      key={"3-text"}
                                                      {...{
                                                        fontWeight: 600,
                                                        fontSize: 16,
                                                        letterSpacing: 0,
                                                        color:
                                                          "rgba(255, 255, 255, 1)",
                                                        lineHeight: 1.193359375,
                                                        horizontalAlign:
                                                          "center",
                                                        verticalAlign: "top",
                                                      }}
                                                    >
                                                      3
                                                    </Text>
                                                  </Container>
                                                }
                                              </Container>
                                            </Container>
                                          }
                                        </Container>
                                      }
                                    </Container>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        )}
                        <Container
                          {...{
                            type: "FRAME",
                            gap: 1,
                            positionType: "static",
                            flexGrow: 1,
                            height: 75,
                          }}
                        >
                          {
                            <Container
                              {...{
                                key: "36:340_stroke_0",
                                borderOpacity: 1,
                                border: 1,
                                borderRadius: 0,
                                flexGrow: 1,
                                borderColor: "rgba(255, 255, 255, 1)",
                              }}
                            >
                              {
                                <Container
                                  key={"Row 3"}
                                  {...{
                                    flexGrow: 1,
                                    type: "FRAME",
                                    gap: -10,
                                    // gapRow: 1,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignContent: "space-between",
                                  }}
                                  {...{}}
                                >
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      overflow: "hidden",
                                      positionType: "static",
                                      width: 92,
                                      transformTranslateZ: 24,
                                      transformTranslateX: -20,
                                      border: 1,
                                      borderColor: "#fff",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:341_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Item 01"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"FIXED-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"FIXED-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    FIXED
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      overflow: "hidden",
                                      positionType: "static",
                                      width: 92,
                                      transformTranslateZ: 4,
                                      transformTranslateX: 0,
                                      border: 1,
                                      borderColor: "#fff",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:343_stroke_0",
                                          borderOpacity: 1,
                                          border: 7,
                                          borderRadius: 27,
                                          flexGrow: 1,
                                          borderColor: "rgba(0, 255, 10, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            {...{
                                              key: "36:343_fill_0",
                                              backgroundOpacity: 0.5,
                                              borderRadius: 20,
                                              flexGrow: 1,
                                              backgroundColor:
                                                "rgba(0, 163, 255, 1)",
                                            }}
                                          >
                                            {
                                              <Container
                                                key={"Item 02"}
                                                {...{
                                                  flexGrow: 1,
                                                  type: "FRAME",
                                                  gap: 4,
                                                  paddingTop: 4,
                                                  paddingBottom: 4,
                                                  paddingLeft: 30,
                                                  paddingRight: 30,
                                                  flexDirection: "column",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                                {...{}}
                                              >
                                                <Container
                                                  {...{
                                                    type: "TEXT",
                                                    positionType: "static",
                                                  }}
                                                >
                                                  {
                                                    <Container
                                                      key={"STROKE-container"}
                                                      {...{
                                                        flexGrow: 1,
                                                        type: "TEXT",
                                                      }}
                                                    >
                                                      <Text
                                                        key={"STROKE-text"}
                                                        {...{
                                                          fontWeight: 600,
                                                          fontSize: 16,
                                                          letterSpacing: 0,
                                                          color:
                                                            "rgba(151, 176, 2, 1)",
                                                          lineHeight: 1.193359375,
                                                          horizontalAlign:
                                                            "center",
                                                          verticalAlign: "top",
                                                        }}
                                                        onPointerUp={(e) => {
                                                          console.log(!on);
                                                          setOn(!on);
                                                          return false;
                                                        }}
                                                      >
                                                        STROKE
                                                      </Text>
                                                    </Container>
                                                  }
                                                </Container>
                                              </Container>
                                            }
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                  <Container
                                    {...{
                                      type: "FRAME",
                                      borderRadius: 20,
                                      gap: 4,
                                      positionType: "static",
                                      width: 92,
                                      // transformTranslateZ: 16,
                                      // transformTranslateX: 16,
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "36:345_stroke_2",
                                          borderOpacity: 0.4000000059604645,
                                          border: 1,
                                          borderRadius: 21,
                                          flexGrow: 1,
                                          borderColor: "rgba(0, 10, 255, 1)",
                                          marginLeft: -1,
                                          marginRight: -1,
                                          marginTop: -1,
                                          marginBottom: -1,
                                        }}
                                      >
                                        {
                                          <Container
                                            {...{
                                              key: "36:345_stroke_1",
                                              borderOpacity: 0.6000000238418579,
                                              border: 1,
                                              borderRadius: 21,
                                              flexGrow: 1,
                                              borderColor:
                                                "rgba(255, 214, 0, 1)",
                                            }}
                                          >
                                            {
                                              <Container
                                                {...{
                                                  key: "36:345_stroke_0",
                                                  borderOpacity: 0.5,
                                                  border: 1,
                                                  borderRadius: 21,
                                                  flexGrow: 1,
                                                  borderColor:
                                                    "rgba(20, 148, 235, 1)",
                                                }}
                                              >
                                                {
                                                  <Container
                                                    {...{
                                                      key: "36:345_fill_0",
                                                      backgroundOpacity: 0.5,
                                                      borderRadius: 20,
                                                      flexGrow: 1,
                                                      backgroundColor:
                                                        "rgba(0, 0, 0, 1)",
                                                    }}
                                                  >
                                                    {
                                                      <Container
                                                        key={"Item 03"}
                                                        {...{
                                                          flexGrow: 1,
                                                          type: "FRAME",
                                                          gap: 4,
                                                          paddingTop: 4,
                                                          paddingBottom: 4,
                                                          flexDirection:
                                                            "column",
                                                          justifyContent:
                                                            "center",
                                                          alignItems: "center",
                                                        }}
                                                        {...{}}
                                                      >
                                                        <Container
                                                          {...{
                                                            type: "FRAME",
                                                            borderRadius: 20,
                                                            gap: 4,
                                                            overflow: "hidden",
                                                            positionType:
                                                              "static",
                                                            width: 18,
                                                          }}
                                                        >
                                                          {
                                                            <Container
                                                              {...{
                                                                key: "130:89_stroke_0",
                                                                borderOpacity: 1,
                                                                border: 1,
                                                                borderRadius: 21,
                                                                flexGrow: 1,
                                                                borderColor:
                                                                  "rgba(0, 0, 0, 1)",
                                                              }}
                                                            >
                                                              {
                                                                <Container
                                                                  {...{
                                                                    key: "130:89_fill_1",
                                                                    backgroundOpacity: 0.4000000059604645,
                                                                    borderRadius: 20,
                                                                    flexGrow: 1,
                                                                    backgroundColor:
                                                                      "rgba(5, 255, 0, 1)",
                                                                  }}
                                                                >
                                                                  {
                                                                    <Container
                                                                      {...{
                                                                        key: "130:89_fill_0",
                                                                        backgroundOpacity: 0.5,
                                                                        borderRadius: 20,
                                                                        flexGrow: 1,
                                                                        backgroundColor:
                                                                          "rgba(0, 0, 0, 1)",
                                                                      }}
                                                                    >
                                                                      {
                                                                        <Container
                                                                          key={
                                                                            "Frame 8"
                                                                          }
                                                                          {...{
                                                                            flexGrow: 1,
                                                                            type: "FRAME",
                                                                            gap: 4,
                                                                            paddingTop: 4,
                                                                            paddingBottom: 4,
                                                                            paddingLeft: 30,
                                                                            paddingRight: 30,
                                                                            flexDirection:
                                                                              "column",
                                                                            justifyContent:
                                                                              "center",
                                                                            alignItems:
                                                                              "center",
                                                                          }}
                                                                          {...{}}
                                                                        ></Container>
                                                                      }
                                                                    </Container>
                                                                  }
                                                                </Container>
                                                              }
                                                            </Container>
                                                          }
                                                        </Container>
                                                      </Container>
                                                    }
                                                  </Container>
                                                }
                                              </Container>
                                            }
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                </Container>
                              }
                            </Container>
                          }
                        </Container>
                        <Container
                          {...{
                            type: "FRAME",
                            gap: 35,
                            positionType: "static",
                            flexGrow: 1,
                          }}
                        >
                          {
                            <Container
                              key={"Row 2"}
                              {...{
                                flexGrow: 1,
                                type: "FRAME",
                                gap: 35,
                                justifyContent: "flex-end",
                                flexDirection: "row",
                                alignItems: "flex-end",
                              }}
                              {...{}}
                            >
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                  width: 69,
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:307_fill_0",
                                      backgroundOpacity: 0.5,
                                      borderRadius: 20,
                                      flexGrow: 1,
                                      backgroundColor: "rgba(0, 0, 0, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        key={"Second Item 01"}
                                        {...{
                                          flexGrow: 1,
                                          type: "FRAME",
                                          gap: 4,
                                          paddingTop: 4,
                                          paddingBottom: 4,
                                          paddingLeft: 30,
                                          paddingRight: 30,
                                          flexDirection: "column",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                        {...{}}
                                      >
                                        <Container
                                          {...{
                                            type: "TEXT",
                                            positionType: "static",
                                          }}
                                        >
                                          {
                                            <Container
                                              key={"HUG-container"}
                                              {...{ flexGrow: 1, type: "TEXT" }}
                                            >
                                              <Text
                                                key={"HUG-text"}
                                                {...{
                                                  fontWeight: 600,
                                                  fontSize: 16,
                                                  letterSpacing: 0,
                                                  color:
                                                    "rgba(255, 255, 255, 1)",
                                                  lineHeight: 1.193359375,
                                                  horizontalAlign: "center",
                                                  verticalAlign: "top",
                                                }}
                                              >
                                                HUG
                                              </Text>
                                            </Container>
                                          }
                                        </Container>
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                  width: 71,
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:308_stroke_0",
                                      borderOpacity: 1,
                                      border: 1,
                                      borderRadius: 21,
                                      flexGrow: 1,
                                      borderColor: "rgba(255, 0, 229, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "10:308_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Second Item 02"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"OUTER-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"OUTER-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    OUTER
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                              <Container
                                {...{
                                  type: "FRAME",
                                  borderRadius: 20,
                                  gap: 4,
                                  overflow: "hidden",
                                  positionType: "static",
                                }}
                              >
                                {
                                  <Container
                                    {...{
                                      key: "10:309_stroke_0",
                                      borderOpacity: 1,
                                      border: 1,
                                      borderRadius: 21,
                                      flexGrow: 1,
                                      borderColor: "rgba(128, 0, 255, 1)",
                                    }}
                                  >
                                    {
                                      <Container
                                        {...{
                                          key: "10:309_fill_0",
                                          backgroundOpacity: 0.5,
                                          borderRadius: 20,
                                          flexGrow: 1,
                                          backgroundColor: "rgba(0, 0, 0, 1)",
                                        }}
                                      >
                                        {
                                          <Container
                                            key={"Second Item 03"}
                                            {...{
                                              flexGrow: 1,
                                              type: "FRAME",
                                              gap: 4,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 30,
                                              paddingRight: 30,
                                              flexDirection: "column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            {...{}}
                                          >
                                            <Container
                                              {...{
                                                type: "TEXT",
                                                positionType: "static",
                                              }}
                                            >
                                              {
                                                <Container
                                                  key={"Center-container"}
                                                  {...{
                                                    flexGrow: 1,
                                                    type: "TEXT",
                                                  }}
                                                >
                                                  <Text
                                                    key={"Center-text"}
                                                    {...{
                                                      fontWeight: 600,
                                                      fontSize: 16,
                                                      letterSpacing: 0,
                                                      color:
                                                        "rgba(255, 255, 255, 1)",
                                                      lineHeight: 1.193359375,
                                                      horizontalAlign: "center",
                                                      verticalAlign: "top",
                                                    }}
                                                  >
                                                    Center
                                                  </Text>
                                                </Container>
                                              }
                                            </Container>
                                          </Container>
                                        }
                                      </Container>
                                    }
                                  </Container>
                                }
                              </Container>
                            </Container>
                          }
                        </Container>
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      gap: 4,
                      overflow: "hidden",
                      x: 382.5,
                      y: -958,
                      width: 119,
                      height: 27,
                      positionType: "absolute",
                      positionTop: 16,
                      positionLeft: "36.56036446469248%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:325_fill_0",
                          backgroundOpacity: 0.5,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(0, 0, 0, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Top"}
                            {...{
                              flexGrow: 1,
                              type: "FRAME",
                              gap: 4,
                              paddingTop: 4,
                              paddingBottom: 4,
                              paddingLeft: 43,
                              paddingRight: 43,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            {...{}}
                          >
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"TOP-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"TOP-text"}
                                    {...{
                                      fontWeight: 900,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.193359375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    TOP
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      gap: 4,
                      overflow: "hidden",
                      x: 585,
                      y: -958,
                      width: 60,
                      height: 66,
                      positionType: "absolute",
                      positionTop: 16,
                      positionRight: 16,
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:330_fill_0",
                          backgroundOpacity: 1,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(23, 220, 144, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Top Right"}
                            {...{
                              flexGrow: 1,
                              type: "FRAME",
                              gap: 4,
                              paddingTop: 4,
                              paddingBottom: 4,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            {...{}}
                          >
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"ABS-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"ABS-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.13623046875,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    ABS
                                  </Text>
                                </Container>
                              }
                            </Container>
                            <Container
                              {...{ type: "TEXT", positionType: "static" }}
                            >
                              {
                                <Container
                                  key={"ABS-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"ABS-text"}
                                    {...{
                                      fontWeight: 600,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.193359375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    ABS
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      overflow: "hidden",
                      x: 238,
                      y: -958,
                      width: 64,
                      height: 64,
                      positionType: "absolute",
                      positionTop: 16,
                      positionLeft: "3.644646924829157%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:335_fill_1",
                          backgroundOpacity: 1,
                          borderRadius: 20,
                          flexGrow: 1,
                          color: { r: 0, g: 0, b: 0, a: 0 },
                          opacity: 0,
                        }}
                      >
                        {
                          <Container
                            {...{
                              key: "10:335_fill_0",
                              backgroundOpacity: 0.5,
                              borderRadius: 20,
                              flexGrow: 1,
                              backgroundColor: "rgba(0, 0, 0, 1)",
                            }}
                          >
                            {
                              <Container
                                key={"TopLeft"}
                                {...{ flexGrow: 1, type: "FRAME" }}
                                {...{}}
                              >
                                <Container
                                  {...{
                                    type: "FRAME",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    x: 256,
                                    y: -940,
                                    width: 28,
                                    height: 28,
                                    positionType: "absolute",
                                    positionTop: 18,
                                    positionLeft: "28.125%",
                                  }}
                                >
                                  {
                                    <Image
                                      {...{
                                        key: "10:339_fill_0",
                                        backgroundOpacity: 1,
                                        borderRadius: 8,
                                        flexGrow: 1,
                                      }}
                                      {...{
                                        src: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f783614d-89a2-43ec-a7b4-aebe6f9f20c6",
                                        borderRadius: 8,
                                      }}
                                    >
                                      {
                                        <Container
                                          key={"ClockIcon"}
                                          {...{ flexGrow: 1, type: "FRAME" }}
                                          {...{}}
                                        ></Container>
                                      }
                                    </Image>
                                  }
                                </Container>
                              </Container>
                            }
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                  <Container
                    {...{
                      type: "FRAME",
                      borderRadius: 20,
                      overflow: "hidden",
                      x: 383,
                      y: -656,
                      width: 118,
                      height: 29,
                      positionType: "absolute",
                      positionBottom: 16,
                      positionLeft: "36.674259681093396%",
                    }}
                  >
                    {
                      <Container
                        {...{
                          key: "10:327_fill_0",
                          backgroundOpacity: 0.5,
                          borderRadius: 20,
                          flexGrow: 1,
                          backgroundColor: "rgba(0, 0, 0, 1)",
                        }}
                      >
                        {
                          <Container
                            key={"Bottom"}
                            {...{ flexGrow: 1, type: "FRAME" }}
                            {...{}}
                          >
                            <Container
                              {...{
                                type: "TEXT",
                                x: 407,
                                y: -651,
                                width: 70,
                                height: 18,
                                positionType: "absolute",
                                positionTop: 5,
                                positionLeft: 24,
                              }}
                            >
                              {
                                <Container
                                  key={"BOTTOM-container"}
                                  {...{ flexGrow: 1, type: "TEXT" }}
                                >
                                  <Text
                                    key={"BOTTOM-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.14990234375,
                                      horizontalAlign: "center",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    BOTTOM
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                    }
                  </Container>
                </Container>
              }
            </Container>
          }
        </Container>
      )}
    </Root>
  );
}
