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
import { Root, Fullscreen, Container, Text, Content } from "@react-three/uikit";
import Scene from "./exports/landing/scene";
import { Button } from "@/src/components/button";
import {
  PictureInPicture2,
  Fullscreen as FullscreenIcon,
} from "@react-three/uikit-lucide";
import { Card } from "@/src/components/card";
import { Tabs, TabsButton } from "@/src/components/tabs";
import PKCanvas from "@/src/components/pk/PKCanvas";
import UI from "./import/ui";

export default function Preview() {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <>
      <PKCanvas
        style={{ height: "100%", touchAction: "none" }}
        gl={{ localClippingEnabled: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[-5, 5, 10]} />
        <Scene />
        <Fullscreen>
          <UI
          //   key="ui"
          //   onSwitch={(fullscreen) => {
          //     // console.log("fullscreen", fullscreen);
          //     // setFullscreen(fullscreen);
          //   }}
          />
        </Fullscreen>
      </PKCanvas>
    </>
  );
}
