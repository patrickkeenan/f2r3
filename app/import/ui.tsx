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
  Input,
} from "@react-three/uikit";
import {
  PictureInPicture2 as PIPIcon,
  Fullscreen as FullscreenIcon,
  X as XIcon,
  Code as CodeIcon,
} from "@react-three/uikit-lucide";
import { Tabs, TabsButton } from "@/app/components/tabs";
import { Button } from "@/app/components/button";
import { Card } from "@/app/components/card";
import { Loading } from "@/app/components/loading";
import { useFigmaContext } from "@/app/auth/figmaTokenContext";

export default function UI({ onSwitch, isLoaded = false, ...props }) {
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
    const { valid, nodeId, fileId } = parseFigmaUrl(frameUrl);
    if (valid) {
      setTimeout(() => {
        // importFigma(token, fileId, nodeId);
        router.push(`${pathname}?nodeId=${nodeId}&fileId=${fileId}`);
      }, 1000);
    }
  };

  function parseFigmaUrl(url: string): {
    valid: boolean;
    nodeId: string;
    fileId: string;
  } {
    console.log("parse", url);
    try {
      // https://www.fima.com/file/qGDiNCmTVCTuBdAoMyMXc4/UIKit-Figma-logo?type=design&node-id=85-10&mode=design&t=UFGGXh4iR0u2sB9B-11
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);

      const nodeId = searchParams.get("node-id");
      const fileId = urlObj.pathname.split("/")[2];
      console.log(urlObj, urlObj.href.indexOf("https://www.figma.com/file"));

      if (
        nodeId &&
        fileId &&
        urlObj.href.indexOf("https://www.figma.com/file") > -1
      ) {
        return { valid: true, nodeId: nodeId ?? "", fileId: fileId ?? "" };
      }
      return { valid: false, nodeId: "", fileId: "" };
    } catch (e) {
      return { valid: false, nodeId: "", fileId: "" };
    }
  }
  function resetUrl() {
    setLayoutData(null);
    setLoadingHover(false);
    setFrameUrl("");
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
          borderRadius={16}
          borderBend={5}
          padding={1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
          // backgroundOpacity={0}
        >
          {!isLoaded && !nodeId && !fileId && (
            <>
              <Container
                borderBottomLeftRadius={10}
                borderBottomRightRadius={4}
                borderTopLeftRadius={10}
                borderTopRightRadius={4}
                // borderBend={5}
                // padding={6}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                alignContent={"center"}
                gap={4}
                width={200}
                // flexGrow={1}
                height={32}
                // backgroundOpacity={0}
                backgroundColor={"#fff"}
                paddingX={12}
                onClick={(e) => {
                  // console.log(inputRef.current);
                  // inputRef.current.value = "";
                  // setFrameUrl("");
                  // @ts-ignore
                  inputRef.current.focus();
                  // e.target.focus();
                }}
                overflow={"hidden"}
              >
                <Container>
                  <Input
                    // positionType={"absolute"}
                    // positionTop={10}
                    fontSize={12}
                    ref={inputRef}
                    defaultValue=""
                    color={"#000"}
                    value={frameUrl}
                    onValueChange={(val) => setFrameUrl(val)}
                    overflow={"scroll"}
                  />
                  {frameUrl == "" && (
                    <Container
                      // marginLeft={-4}
                      // positionTop={10}
                      // flexGrow={1}
                      positionType={"absolute"}
                    >
                      <Text fontSize={12} color={"rgb(0,0,0)"} opacity={0.3}>
                        https://www.figma...
                      </Text>
                    </Container>
                  )}
                </Container>
              </Container>

              <Button
                variant="pill"
                size="sm"
                borderBottomLeftRadius={4}
                borderBottomRightRadius={10}
                borderTopLeftRadius={4}
                borderTopRightRadius={10}
                disabled={!urlValid}
                onClick={() => {
                  startLoading();
                }}
              >
                <Text fontWeight={"medium"}>Import</Text>
              </Button>
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
            {loadingHover && <XIcon height={20} width={20} />}
            {!loadingHover && <Loading size="sm" />}
          </Container>

          {isLoaded && (
            // <Container key="toolbar" display={isLoaded ? "flex" : "none"}>
            <>
              <Button
                variant="icon"
                size="sm"
                borderRadius={12}
                selected={showEditor}
                onClick={() => setShowEditor(!showEditor)}
              >
                <CodeIcon height={16} width={16} />
              </Button>
              <Container
                height={24}
                width={1}
                borderColor={"#fff"}
                borderOpacity={0.2}
                borderLeft={1}
                marginX={4}
              />
              <Button
                variant="icon"
                size="sm"
                borderRadius={10}
                selected={isFullscreen ? true : false}
                onClick={() => setIsFullscreen(true)}
              >
                <PIPIcon height={16} width={16} />
              </Button>
              <Button
                variant="icon"
                size="sm"
                borderRadius={12}
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
                marginX={4}
              />
              <Button
                variant="icon"
                size="sm"
                borderRadius={10}
                onClick={() => {
                  resetUrl();
                }}
              >
                <XIcon height={16} width={16} />
              </Button>
              {/* </Container> */}
            </>
          )}
        </Card>
      </Container>
    </Container>
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
