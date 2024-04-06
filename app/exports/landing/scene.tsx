import { Fullscreen, Container, Text, Image } from "@react-three/uikit";
export default function Layout() {
  return (
    <Fullscreen
      backgroundColor="white"
      paddingY={32}
      gap={4}
      overflow="scroll"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        width={103}
        src={
          "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0b6757a3-0ee3-48ec-ab4c-579a6d7e70e0"
        }
        borderRadius={0}
      />
      <Container
        gap={36}
        positionType="static"
        flexShrink={0}
        alignItems="flex-start"
        maxWidth="100%"
        overflow="hidden"
      >
        {
          <Container
            key={"Features"}
            {...{
              type: "FRAME",
              gap: 128,
              justifyContent: "space-between",
              alignContent: "stretch",
              alignSelf: "stretch",
              paddingTop: 44,
              paddingBottom: 44,
              flexDirection: "column",
              alignItems: "center",
            }}
            {...{}}
          >
            <Container
              key={"Frame 5"}
              {...{
                maxWidth: 1200,
                type: "FRAME",
                gap: 100,
                paddingX: 32,
                flexDirection: "column",
                lg: { flexDirection: "row" },
                alignItems: "center",
              }}
              {...{}}
            >
              <Container
                {...{
                  maxWidth: 500,
                  gap: 32,
                }}
              >
                {
                  <Container
                    key={"PKBlurb"}
                    {...{
                      type: "FRAME",
                      gap: 32,
                      alignSelf: "stretch",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    {...{}}
                  >
                    <Container
                      {...{
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
                          }}
                        >
                          <Text
                            key={"From canvas to world in a click-text"}
                            {...{
                              fontWeight: 600,
                              fontSize: 64,
                              letterSpacing: 0,
                              color: "rgba(0, 0, 0, 1)",
                              lineHeight: 1.0625,
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
                    <Container
                      {...{
                        borderRadius: 8,
                        type: "FRAME",
                        gap: 4,
                        overflow: "hidden",
                        positionType: "static",
                        alignItems: "flex-start",
                        height: 75,
                      }}
                    >
                      {
                        <Container
                          cursor="pointer"
                          onClick={() => (window.location.href = "/import")}
                          transformTranslateZ={36}
                          {...{
                            backgroundOpacity: 1,
                            borderRadius: 8,
                            flexGrow: 1,
                            alignSelf: "stretch",
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            hover: {
                              backgroundOpacity: 0.8,
                              transformTranslateZ: 48,
                            },
                          }}
                        >
                          {
                            <Container
                              key={"TryButton"}
                              {...{
                                type: "FRAME",
                                gap: 4,
                                paddingTop: 18,
                                paddingBottom: 18,
                                paddingLeft: 32,
                                paddingRight: 32,
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                              {...{}}
                            >
                              <Container
                                {...{
                                  type: "TEXT",
                                  positionType: "static",
                                  alignItems: "flex-start",
                                }}
                              >
                                {
                                  <Container
                                    key={"Try it out-container"}
                                    {...{
                                      type: "TEXT",
                                    }}
                                  >
                                    <Text
                                      key={"Try it out-text"}
                                      {...{
                                        fontWeight: 600,
                                        fontSize: 32,
                                        letterSpacing: 0,
                                        color: "rgba(255, 255, 255, 1)",
                                        lineHeight: 1.2102272510528564,
                                        horizontalAlign: "left",
                                        verticalAlign: "top",
                                      }}
                                    >
                                      Try it out
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
              <Container
                {...{
                  type: "FRAME",
                  gap: 4,
                  transformTranslateZ: 80,
                  transformTranslateX: 0,
                  positionType: "static",
                  width: 476,
                  height: 476,
                }}
              >
                <Container
                  {...{
                    type: "FRAME",
                    positionType: "static",
                    width: 550,
                    height: 550,
                  }}
                >
                  {
                    <Container
                      key={"Frame 7"}
                      {...{
                        type: "FRAME",
                      }}
                      {...{}}
                    >
                      <Container
                        {...{
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          type: "VECTOR",
                          x: -3190,
                          y: 3827,
                          width: 92,
                          height: 67.5,
                          positionType: "absolute",
                          positionTop: 116,
                          positionLeft: "41.72727272727273%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/afca7ae4-5d44-4358-8751-9709fc937baf"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -3382,
                          y: 3968,
                          width: 173,
                          height: 176,
                          positionType: "absolute",
                          positionTop: 257,
                          positionLeft: "6.8181818181818175%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/a5bb5751-4e2a-40f6-ac6e-85ee5be1e92d"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -3383,
                          y: 3748,
                          width: 203,
                          height: 176,
                          positionType: "absolute",
                          positionTop: 37,
                          positionLeft: "6.636363636363636%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/70a3f55f-6d7a-48da-931a-908c72772f88"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -3109,
                          y: 3796,
                          width: 174,
                          height: 176,
                          positionType: "absolute",
                          positionTop: 85,
                          positionLeft: "56.45454545454546%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/1acfe6a2-f25d-4be4-9abd-0de827ead75b"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          x: -3156.5,
                          y: 3997,
                          width: 189,
                          height: 218,
                          positionType: "absolute",
                          positionTop: 286,
                          positionLeft: "47.81818181818182%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bde061be-939a-4acf-9274-f093b1902189"
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
                          x: -3218,
                          y: 4041,
                          width: 62.5,
                          height: 68,
                          positionType: "absolute",
                          positionTop: 330,
                          positionLeft: "36.63636363636364%",
                        }}
                      >
                        {
                          <Image
                            src={
                              "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6c9baa10-8e69-49bb-b8e3-5d581529d31b"
                            }
                            borderRadius={0}
                          />
                        }
                      </Container>
                    </Container>
                  }
                </Container>
              </Container>
            </Container>
            <Container
              {...{
                type: "FRAME",
                maxWidth: 1200,
                gap: 100,
                paddingX: 32,
                positionType: "static",
                flexGrow: 1,
                flexShrink: 1,
                alignSelf: "stretch",
                flexDirection: "column-reverse",
                lg: { flexDirection: "row" },
                alignItems: "center",
              }}
            >
              <Container
                {...{
                  type: "FRAME",
                  transformTranslateZ: 80,
                  transformTranslateX: 0,
                  positionType: "static",
                  width: 476,
                  height: 476,
                }}
              >
                {
                  <Image
                    src={
                      "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d347dfb3-909f-4249-8b82-5ded7578b069"
                    }
                    borderRadius={0}
                  />
                }
              </Container>
              <Container
                {...{
                  type: "FRAME",
                  maxWidth: 500,
                  gap: 32,
                  positionType: "static",
                  flexGrow: 1,
                  flexShrink: 1,
                }}
              >
                {
                  <Container
                    key={"PKBlurb"}
                    {...{
                      type: "FRAME",
                      gap: 32,
                      alignSelf: "stretch",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                    {...{}}
                  >
                    <Container
                      {...{
                        alignSelf: "stretch",
                        alignItems: "flex-start",
                      }}
                    >
                      {
                        <Container
                          key={"Copy & Paste-container"}
                          {...{
                            type: "TEXT",
                            justifyContent: "space-between",
                            alignContent: "stretch",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text
                            key={"Copy & Paste-text"}
                            {...{
                              fontWeight: 600,
                              fontSize: 64,
                              letterSpacing: 0,
                              color: "rgba(0, 0, 0, 1)",
                              lineHeight: 1.0625,
                              horizontalAlign: "left",
                              verticalAlign: "top",
                            }}
                          >
                            Copy & Paste
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
                            "You can take any composition in figma and copy the frame link. Then, go to the import page, paste it in. This will import your layout, images, and even prototype links. You’ll be able to view the layout in 2D, 3D, in or in WebXR.-container"
                          }
                          {...{
                            type: "TEXT",
                            justifyContent: "space-between",
                            alignContent: "stretch",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text
                            key={
                              "You can take any composition in figma and copy the frame link. Then, go to the import page, paste it in. This will import your layout, images, and even prototype links. You’ll be able to view the layout in 2D, 3D, in or in WebXR.-text"
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
                            You can take any composition in figma and copy the
                            frame link. Then, go to the import page, paste it
                            in. This will import your layout, images, and even
                            prototype links. You’ll be able to view the layout
                            in 2D, 3D, in or in WebXR.
                          </Text>
                        </Container>
                      }
                    </Container>
                    <Container
                      {...{
                        borderRadius: 8,
                        type: "FRAME",
                        gap: 4,
                        overflow: "hidden",
                        positionType: "static",
                        alignItems: "flex-start",
                        height: 75,
                      }}
                    >
                      {
                        <Container
                          cursor="pointer"
                          onClick={() => (window.location.href = "/import")}
                          transformTranslateZ={36}
                          {...{
                            backgroundOpacity: 1,
                            borderRadius: 8,
                            flexGrow: 1,
                            alignSelf: "stretch",
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            hover: {
                              backgroundOpacity: 0.8,
                              transformTranslateZ: 48,
                            },
                          }}
                        >
                          {
                            <Container
                              key={"TryButton"}
                              {...{
                                type: "FRAME",
                                gap: 4,
                                paddingTop: 18,
                                paddingBottom: 18,
                                paddingLeft: 32,
                                paddingRight: 32,
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                              {...{}}
                            >
                              <Container
                                {...{
                                  type: "TEXT",
                                  positionType: "static",
                                  alignItems: "flex-start",
                                }}
                              >
                                {
                                  <Container
                                    cursor="pointer"
                                    onClick={() =>
                                      (window.location.href = "/import")
                                    }
                                    key={"Try it out-container"}
                                    {...{
                                      type: "TEXT",
                                    }}
                                  >
                                    <Text
                                      key={"Try it out-text"}
                                      {...{
                                        fontWeight: 600,
                                        fontSize: 32,
                                        letterSpacing: 0,
                                        color: "rgba(255, 255, 255, 1)",
                                        lineHeight: 1.2102272510528564,
                                        horizontalAlign: "left",
                                        verticalAlign: "top",
                                      }}
                                    >
                                      Try it out
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
            </Container>
            <Container
              key={"Frame 7"}
              {...{
                type: "FRAME",
                gap: 100,
                maxWidth: 1200,
                justifyContent: "center",
                alignContent: "stretch",
                alignSelf: "stretch",
                paddingLeft: 36,
                paddingRight: 36,
                flexDirection: "column",
                alignItems: "center",
                lg: { flexDirection: "row" },
              }}
              {...{}}
            >
              <Container
                {...{
                  type: "FRAME",
                  maxWidth: 500,
                  gap: 32,
                  positionType: "static",
                  flexGrow: 1,
                  flexShrink: 1,
                  alignSelf: "stretch",
                  alignItems: "flex-start",
                }}
              >
                {
                  <Container
                    key={"PKBlurb"}
                    {...{
                      type: "FRAME",
                      gap: 32,
                      alignSelf: "stretch",
                      flexDirection: "column",
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
                          key={"Export TSX to do even more-container"}
                          {...{
                            type: "TEXT",
                            justifyContent: "space-between",
                            alignContent: "stretch",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text
                            key={"Export TSX to do even more-text"}
                            {...{
                              fontWeight: 600,
                              fontSize: 64,
                              letterSpacing: 0,
                              color: "rgba(0, 0, 0, 1)",
                              lineHeight: 1.0625,
                              horizontalAlign: "left",
                              verticalAlign: "top",
                            }}
                          >
                            Export TSX to do even more
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
                            "All the layout is composed with react three fiber and uikit. This means you can copy this code and paste it into your react app. There’s a ton of plug-ins and libraries that can help you on your way.-container"
                          }
                          {...{
                            type: "TEXT",
                            justifyContent: "space-between",
                            alignContent: "stretch",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text
                            key={
                              "All the layout is composed with react three fiber and uikit. This means you can copy this code and paste it into your react app. There’s a ton of plug-ins and libraries that can help you on your way.-text"
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
                            All the layout is composed with react three fiber
                            and uikit. This means you can copy this code and
                            paste it into your react app. There’s a ton of
                            plug-ins and libraries that can help you on your
                            way.
                          </Text>
                        </Container>
                      }
                    </Container>
                    <Container
                      {...{
                        borderRadius: 8,
                        type: "FRAME",
                        gap: 4,
                        overflow: "hidden",
                        positionType: "static",
                        alignItems: "flex-start",
                        height: 75,
                      }}
                    >
                      {
                        <Container
                          cursor="pointer"
                          onClick={() => (window.location.href = "/import")}
                          transformTranslateZ={36}
                          {...{
                            backgroundOpacity: 1,
                            borderRadius: 8,
                            flexGrow: 1,
                            alignSelf: "stretch",
                            backgroundColor: "rgba(0, 0, 0, 1)",
                            hover: {
                              backgroundOpacity: 0.8,
                              transformTranslateZ: 48,
                            },
                          }}
                        >
                          {
                            <Container
                              key={"TryButton"}
                              {...{
                                type: "FRAME",
                                gap: 4,
                                paddingTop: 18,
                                paddingBottom: 18,
                                paddingLeft: 32,
                                paddingRight: 32,
                                flexDirection: "row",
                                justifyContent: "center",
                              }}
                              {...{}}
                            >
                              <Container
                                {...{
                                  type: "TEXT",
                                  positionType: "static",
                                  alignItems: "flex-start",
                                }}
                              >
                                {
                                  <Container
                                    cursor="pointer"
                                    onClick={() =>
                                      (window.location.href = "/import")
                                    }
                                    key={"Try it out-container"}
                                    {...{
                                      type: "TEXT",
                                    }}
                                  >
                                    <Text
                                      key={"Try it out-text"}
                                      {...{
                                        fontWeight: 600,
                                        fontSize: 32,
                                        letterSpacing: 0,
                                        color: "rgba(255, 255, 255, 1)",
                                        lineHeight: 1.2102272510528564,
                                        horizontalAlign: "left",
                                        verticalAlign: "top",
                                      }}
                                    >
                                      Try it out
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
              <Container
                {...{
                  type: "FRAME",
                  transformTranslateZ: 80,
                  transformTranslateX: 0,
                  positionType: "static",
                  width: 476,
                  height: 476,
                }}
              >
                {
                  <Image
                    src={
                      "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/6b9d8cb9-2895-437c-8a6d-a13708b743cf"
                    }
                    borderRadius={0}
                  />
                }
              </Container>
            </Container>
          </Container>
        }
      </Container>

      <Container
        {...{
          type: "FRAME",
          overflow: "hidden",
          positionType: "static",
          flexGrow: 1,
          flexShrink: 0,
          maxWidth: "100%",
          alignSelf: "stretch",
          alignItems: "flex-start",
        }}
      >
        {
          <Container
            {...{
              backgroundOpacity: 1,
              flexGrow: 1,
              alignSelf: "stretch",
              backgroundColor: "rgba(30, 30, 30, 1)",
            }}
          >
            {
              <Container
                key={"Frame 2608030"}
                {...{
                  type: "FRAME",
                  justifyContent: "center",
                  alignContent: "stretch",
                  alignSelf: "stretch",
                  paddingTop: 64,
                  paddingBottom: 128,
                  paddingLeft: 20,
                  paddingRight: 20,
                  flexDirection: "row",
                }}
                {...{}}
              >
                <Container
                  {...{
                    type: "FRAME",
                    gap: 80,
                    positionType: "static",
                    flexGrow: 1,
                    flexShrink: 1,
                    alignSelf: "stretch",
                    alignItems: "flex-start",
                    paddingX: 32,
                  }}
                >
                  {
                    <Container
                      key={"Frame 2608031"}
                      {...{
                        type: "FRAME",
                        gap: 80,
                        alignSelf: "stretch",
                        flexDirection: "column",
                        lg: { flexDirection: "row" },
                        justifyContent: "center",
                      }}
                      {...{}}
                    >
                      <Container
                        {...{
                          type: "FRAME",
                          maxWidth: 500,
                          gap: 8,
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={"PKBlurb"}
                            {...{
                              type: "FRAME",
                              gap: 8,
                              alignSelf: "stretch",
                              flexDirection: "column",
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
                                  key={"Contribute on Github-container"}
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={"Contribute on Github-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.2102272510528564,
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    Contribute on Github
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
                                    "There’s lots of issues, so please jump in to help if you can.-container"
                                  }
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={
                                      "There’s lots of issues, so please jump in to help if you can.-text"
                                    }
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      lineHeight: 1.2102272245619032,
                                      color: "rgba(255, 255, 255, 1)",

                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    There's lots of issues, so please jump in to
                                    help if you can.
                                  </Text>
                                  <Text
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      lineHeight: 1.2102272245619032,
                                      color: "#fff",
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                      borderBottom: 1,
                                      borderColor: "#666",
                                      positionType: "static",
                                      width: "auto",
                                      alignSelf: "flex-start",
                                      cursor: "pointer",
                                      marginTop: 12,
                                      hover: {
                                        borderColor: "#fff",
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
                          maxWidth: 500,
                          gap: 8,
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={"PKBlurb"}
                            {...{
                              type: "FRAME",
                              gap: 8,
                              alignSelf: "stretch",
                              flexDirection: "column",
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
                                  key={"Contribute in Figma-container"}
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={"Contribute in Figma-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.2102272510528564,
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    Contribute in Figma
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
                                    "We’ve got some basic starter templates, but it would be great to have even more examples.-container"
                                  }
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={
                                      "We’ve got some basic starter templates, but it would be great to have even more examples.-text"
                                    }
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.2102272245619032,
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    We've got some basic starter templates, but
                                    it would be great to have even more
                                    examples.
                                  </Text>
                                  <Text
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      lineHeight: 1.2102272245619032,
                                      color: "#fff",
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                      borderBottom: 1,
                                      borderColor: "#666",
                                      positionType: "static",
                                      width: "auto",
                                      alignSelf: "flex-start",
                                      cursor: "pointer",
                                      marginTop: 12,
                                      hover: {
                                        borderColor: "#fff",
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
                                </Container>
                              }
                            </Container>
                          </Container>
                        }
                      </Container>
                      <Container
                        {...{
                          type: "FRAME",
                          maxWidth: 500,
                          gap: 8,
                          positionType: "static",
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "stretch",
                          alignItems: "flex-start",
                        }}
                      >
                        {
                          <Container
                            key={"PKBlurb"}
                            {...{
                              type: "FRAME",
                              gap: 8,
                              alignSelf: "stretch",
                              flexDirection: "column",
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
                                  key={"Let us know-container"}
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={"Let us know-text"}
                                    {...{
                                      fontWeight: 700,
                                      fontSize: 16,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.2102272510528564,
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    Let us know
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
                                    "If you use this to make something, let us know and we’ll share it.-container"
                                  }
                                  {...{
                                    type: "TEXT",
                                    justifyContent: "space-between",
                                    alignContent: "stretch",
                                    alignSelf: "stretch",
                                  }}
                                >
                                  <Text
                                    key={
                                      "If you use this to make something, let us know and we’ll share it.-text"
                                    }
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      letterSpacing: 0,
                                      color: "rgba(255, 255, 255, 1)",
                                      lineHeight: 1.2102272245619032,
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                    }}
                                  >
                                    If you use this to make something, let us
                                    know and we'll share it.
                                  </Text>
                                  <Text
                                    {...{
                                      fontWeight: 400,
                                      fontSize: 18,
                                      lineHeight: 1.2102272245619032,
                                      color: "#fff",
                                      horizontalAlign: "left",
                                      verticalAlign: "top",
                                      borderBottom: 1,
                                      borderColor: "#666",
                                      positionType: "static",
                                      width: "auto",
                                      alignSelf: "flex-start",
                                      cursor: "pointer",
                                      marginTop: 12,
                                      hover: {
                                        borderColor: "#fff",
                                      },
                                    }}
                                    onClick={() =>
                                      window.open(
                                        "https://twitter.com/patrickkeenanme"
                                      )
                                    }
                                  >
                                    Reach out
                                  </Text>
                                </Container>
                              }
                            </Container>
                          </Container>
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
    </Fullscreen>
  );
}
