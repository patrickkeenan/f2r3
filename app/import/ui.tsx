import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import { FrameCorners, PictureInPicture } from "@phosphor-icons/react";
import {
  Root,
  Fullscreen,
  Container,
  Text,
  Content,
  DefaultProperties,
} from "@react-three/uikit";
import {
  PictureInPicture2 as PIPIcon,
  Fullscreen as FullscreenIcon,
  X as XIcon,
  Code as CodeIcon,
  RotateCw as RotateCwIcon,
} from "@react-three/uikit-lucide";

import { Tabs, TabsButton } from "@/app/components/tabs";
import { Button } from "@/app/components/button";
import { Input } from "@/app/components/input";
import { Card } from "@/app/components/card";
import { Loading } from "@/app/components/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/tooltip";

import { useFigmaContext } from "@/app/auth/figmaTokenContext";
import { useEnterXR } from "@coconut-xr/natuerlich/react";

export default function UI({
  onSwitch,
  onToggleEditor,
  isLoaded = false,
  ...props
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, nodeId, fileId } = useFigmaContext();
  const [fileName, setFileName] = useState("");
  const [urlValid, setUrlValid] = useState(false);
  const [loadingHover, setLoadingHover] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const inputRef = useRef(null);
  const [frameUrl, setFrameUrl] = useState("");
  const [layoutData, setLayoutData] = useState<any | null>(null);

  const startLoading = () => {
    setLoadingHover(false);
    const { valid, nodeId, fileId, startingPointNodeId } =
      parseFigmaUrl(frameUrl);
    if (valid) {
      setTimeout(() => {
        // importFigma(token, fileId, nodeId);
        if (startingPointNodeId) {
          router.push(
            `${pathname}?nodeId=${nodeId}&fileId=${fileId}&startingPointNodeId=${startingPointNodeId}`
          );
        } else {
          router.push(`${pathname}?nodeId=${nodeId}&fileId=${fileId}`);
        }
      }, 1000);
    }
  };

  function parseFigmaUrl(url: string): {
    valid: boolean;
    nodeId: string;
    fileId: string;
    startingPointNodeId: string;
    fileName: string;
  } {
    console.log("parse", url);
    try {
      // https://www.fima.com/file/qGDiNCmTVCTuBdAoMyMXc4/UIKit-Figma-logo?type=design&node-id=85-10&mode=design&t=UFGGXh4iR0u2sB9B-11
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);

      const nodeId = searchParams.get("node-id");
      const startingPointNodeId = searchParams.get("starting-point-node-id");
      const fileId = urlObj.pathname.split("/")[2];
      const fileName = urlObj.pathname.split("/")[3];
      // console.log(urlObj, urlObj.href.indexOf("https://www.figma.com/file"));

      if (
        (nodeId &&
          fileId &&
          urlObj.href.indexOf("https://www.figma.com/file") > -1) ||
        urlObj.href.indexOf("https://www.figma.com/proto") > -1
      ) {
        return {
          valid: true,
          nodeId: nodeId?.replace("-", ":") ?? "",
          fileId: fileId ?? "",
          startingPointNodeId: startingPointNodeId ?? "",
          fileName: fileName,
        };
      }
      return {
        valid: false,
        nodeId: "",
        fileId: "",
        fileName: "",
        startingPointNodeId: "",
      };
    } catch (e) {
      return {
        valid: false,
        nodeId: "",
        fileId: "",
        fileName: "",
        startingPointNodeId: "",
      };
    }
  }
  function resetUrl() {
    setLayoutData(null);
    setLoadingHover(false);
    setFrameUrl("");
    setUrlValid(false);
    router.push(`${pathname}`);
  }
  // useEffect(() => {
  //   resetUrl();
  // }, []);
  useEffect(() => {
    const { valid, nodeId, fileId, fileName } = parseFigmaUrl(frameUrl);
    if (valid) {
      // router.push(`${pathname}?nodeId=${nodeId}&fileId=${fileId}`);
      setUrlValid(true);
      setFileName(fileName);
    } else {
      setUrlValid(false);
      setFileName("");
    }
  }, [frameUrl]);

  useEffect(() => {
    onSwitch(isFullscreen);
  }, [isFullscreen]);

  const sessionOptions = {
    requiredFeatures: [
      "hit-test",
      "plane-detection",
      "anchors",
      "hand-tracking",
      "local-floor",
      // "layers",
    ],
  };
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const [isQuest, setIsQuest] = useState("");
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  useEffect(() => {
    const xr = (navigator as any)?.xr as XRSystem;
    setDevicePixelRatio(window.devicePixelRatio);
    if (!xr) {
      setIsQuest("notQuest");
    } else {
      xr.isSessionSupported("immersive-vr").then((isSupported) => {
        if (isSupported) {
          setIsQuest("quest");
        } else {
          setIsQuest("notQuest");
        }
      });
    }
  }, []);

  return (
    <DefaultProperties>
      <Container
        positionType={"absolute"}
        positionBottom={20}
        positionLeft={"50%"}
        flexShrink={1}
        alignItems={"flex-start"}
        zIndexOffset={500}
      >
        <Container positionLeft={"-50%"}>
          <Card
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {!token && (
              <Button
                variant="pill"
                onPointerUp={() => {
                  const authUrl = `https://www.figma.com/oauth?client_id=${process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SERVER_URL}/auth&scope=files:read&state=abc&response_type=code`;
                  router.push(authUrl);
                }}
              >
                <Text fontWeight={"medium"}>Login with Figma</Text>
              </Button>
            )}
            {token && (
              <>
                {!isLoaded && !nodeId && !fileId && (
                  <>
                    <Container
                      flexDirection="row"
                      alignItems="stretch"
                      gap={4}
                      marginX={1}
                    >
                      {urlValid && (
                        <Button
                          variant="pill"
                          backgroundColor={"#444"}
                          hover={{ backgroundColor: "#444" }}
                          backgroundOpacity={0.4}
                          flexDirection={"row"}
                        >
                          <Text fontWeight={"normal"}>
                            {fileName.replace(/-/g, " ")}
                          </Text>
                          <Button
                            variant="icon"
                            size="sm"
                            marginRight={-16}
                            marginLeft={8}
                            selected={showEditor}
                            onPointerUp={(e) => {
                              console.log("test");
                              setFrameUrl("");
                              e.stopPropagation();
                            }}
                          >
                            <XIcon height={16} width={16} />
                          </Button>
                        </Button>
                      )}
                      {!urlValid && (
                        <Input
                          variant="pill"
                          width={200}
                          placeholder="https://"
                          defaultValue=""
                          value={frameUrl}
                          onValueChange={(val) => setFrameUrl(val)}
                        />
                      )}
                      <Button
                        variant="pill"
                        disabled={!urlValid}
                        onPointerUp={() => {
                          startLoading();
                        }}
                      >
                        <Text fontWeight={"medium"}>Import</Text>
                      </Button>
                    </Container>
                  </>
                )}

                <Container
                  display={!isLoaded && nodeId && fileId ? "flex" : "none"}
                  padding={4}
                  onHoverChange={(v) => setLoadingHover(v)}
                  onPointerUp={() => {
                    resetUrl();
                  }}
                >
                  {loadingHover && <XIcon height={28} width={28} />}
                  {!loadingHover && <Loading size="md" />}
                </Container>

                {isLoaded && (
                  // <Container key="toolbar" display={isLoaded ? "flex" : "none"}>
                  <>
                    <MenuButton
                      label={showEditor ? "Hide code" : "Show code"}
                      selected={showEditor}
                      onPointerUp={() => {
                        setShowEditor(!showEditor);
                        onToggleEditor(!showEditor);
                      }}
                    >
                      <CodeIcon height={16} width={16} />
                    </MenuButton>

                    <Container
                      height={24}
                      width={1}
                      borderColor={"#fff"}
                      borderOpacity={0.2}
                      borderLeft={1}
                      marginX={8}
                    />
                    {isQuest == "quest" && (
                      <MenuButton
                        label={"Enter Immersive"}
                        onPointerUp={enterAR}
                      >
                        <Text fontWeight={"bold"} fontSize={10}>
                          VR
                        </Text>
                      </MenuButton>
                    )}
                    {isQuest !== "quest" && (
                      <MenuButton
                        label={"Enter Immersive"}
                        onPointerUp={() => {
                          // console.log(
                          //   `https://hmd.link/${window.location.href}?token=${token}`
                          // );
                          window.open(
                            `https://hmd.link/${window.location.href}?token=${token}`,
                            "_blank"
                          );
                        }}
                      >
                        <Text fontWeight={"bold"} fontSize={10}>
                          VR
                        </Text>
                      </MenuButton>
                    )}
                    <MenuButton
                      label={"Fullscreen UI"}
                      selected={isFullscreen ? true : false}
                      onPointerUp={() => setIsFullscreen(true)}
                    >
                      <FullscreenIcon height={16} width={16} />
                    </MenuButton>
                    <MenuButton
                      label={"Floating UI"}
                      selected={isFullscreen ? false : true}
                      onPointerUp={() => setIsFullscreen(false)}
                    >
                      <PIPIcon height={16} width={16} />
                    </MenuButton>
                    <Container
                      height={24}
                      width={1}
                      borderColor={"#fff"}
                      borderOpacity={0.2}
                      borderLeft={1}
                      marginX={8}
                    />
                    <MenuButton
                      label={"Reload"}
                      onPointerUp={() => {
                        window.location.reload();
                      }}
                    >
                      <RotateCwIcon height={16} width={16} />
                    </MenuButton>
                    <MenuButton
                      label={"Close"}
                      onPointerUp={() => {
                        const shouldReset = window.confirm(
                          "Are you sure you want to exit?"
                        );
                        if (shouldReset) resetUrl();
                      }}
                    >
                      <XIcon height={16} width={16} />
                    </MenuButton>
                    {/* </Container> */}
                  </>
                )}
              </>
            )}
          </Card>
        </Container>
      </Container>
    </DefaultProperties>
  );
  // return (
  //   <div className={styles.tabBar}>
  //     <div
  //       className={`${styles.tabBarButton} ${fullscreen ? styles.tabBarButtonSelected : ""}`}
  //       onPointerUp={() => setFullscreen(true)}
  //     >
  //       <FrameCorners className={styles.icon} weight="fill" size={32} />
  //     </div>
  //     <div
  //       className={`${styles.tabBarButton} ${!fullscreen ? styles.tabBarButtonSelected : ""}`}
  //       onPointerUp={() => setFullscreen(false)}
  //     >
  //       <PictureInPicture className={styles.icon} weight="fill" size={32} />
  //     </div>
  //   </div>
  // );
}

function MenuButton({ children, label, ...props }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant="icon" size="sm" {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        backgroundColor={"#000"}
        backgroundOpacity={0.5}
        borderOpacity={0.1}
      >
        <Text fontSize={12} fontWeight={"medium"} color="#fff">
          {label}
        </Text>
      </TooltipContent>
    </Tooltip>
  );
}
