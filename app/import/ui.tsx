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
import { useFigmaContext } from "@/app/auth/figmaTokenContext";

export default function UI({
  onSwitch,
  onToggleEditor,
  isLoaded = false,
  ...props
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, nodeId, fileId } = useFigmaContext();
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
  } {
    console.log("parse", url);
    try {
      // https://www.fima.com/file/qGDiNCmTVCTuBdAoMyMXc4/UIKit-Figma-logo?type=design&node-id=85-10&mode=design&t=UFGGXh4iR0u2sB9B-11
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);

      const nodeId = searchParams.get("node-id");
      const startingPointNodeId = searchParams.get("starting-point-node-id");
      const fileId = urlObj.pathname.split("/")[2];
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
        };
      }
      return { valid: false, nodeId: "", fileId: "", startingPointNodeId: "" };
    } catch (e) {
      return { valid: false, nodeId: "", fileId: "", startingPointNodeId: "" };
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
    const { valid, nodeId, fileId } = parseFigmaUrl(frameUrl);
    if (valid) {
      // router.push(`${pathname}?nodeId=${nodeId}&fileId=${fileId}`);
      setUrlValid(true);
    }
  }, [frameUrl]);

  useEffect(() => {
    onSwitch(isFullscreen);
  }, [isFullscreen]);

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
                onClick={() => {
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
                    <Container flexDirection="row" alignItems="stretch" gap={4}>
                      <Input
                        variant="pill"
                        width={200}
                        placeholder="https://"
                        defaultValue=""
                        value={frameUrl}
                        onValueChange={(val) => setFrameUrl(val)}
                      />
                      <Button
                        variant="pill"
                        disabled={!urlValid}
                        onClick={() => {
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
                  onClick={() => {
                    resetUrl();
                  }}
                >
                  {loadingHover && <XIcon height={28} width={28} />}
                  {!loadingHover && <Loading size="md" />}
                </Container>

                {isLoaded && (
                  // <Container key="toolbar" display={isLoaded ? "flex" : "none"}>
                  <>
                    <Button
                      variant="icon"
                      size="sm"
                      selected={showEditor}
                      onClick={() => {
                        setShowEditor(!showEditor);
                        onToggleEditor(!showEditor);
                      }}
                    >
                      <CodeIcon height={16} width={16} />
                    </Button>
                    <Container
                      height={24}
                      width={1}
                      borderColor={"#fff"}
                      borderOpacity={0.2}
                      borderLeft={1}
                      marginX={8}
                    />
                    <Button
                      variant="icon"
                      size="sm"
                      selected={isFullscreen ? true : false}
                      onClick={() => setIsFullscreen(true)}
                    >
                      <FullscreenIcon height={16} width={16} />
                    </Button>
                    <Button
                      variant="icon"
                      size="sm"
                      selected={isFullscreen ? false : true}
                      onClick={() => setIsFullscreen(false)}
                    >
                      <PIPIcon height={16} width={16} />
                    </Button>
                    <Container
                      height={24}
                      width={1}
                      borderColor={"#fff"}
                      borderOpacity={0.2}
                      borderLeft={1}
                      marginX={8}
                    />
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      <RotateCwIcon height={16} width={16} />
                    </Button>
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={() => {
                        resetUrl();
                      }}
                    >
                      <XIcon height={16} width={16} />
                    </Button>
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
  //       onClick={() => setFullscreen(true)}
  //     >
  //       <FrameCorners className={styles.icon} weight="fill" size={32} />
  //     </div>
  //     <div
  //       className={`${styles.tabBarButton} ${!fullscreen ? styles.tabBarButtonSelected : ""}`}
  //       onClick={() => setFullscreen(false)}
  //     >
  //       <PictureInPicture className={styles.icon} weight="fill" size={32} />
  //     </div>
  //   </div>
  // );
}
