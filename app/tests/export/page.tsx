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
import Scene from "./scene";
import { Button } from "@/src/components/button";
import {
  PictureInPicture2,
  Fullscreen as FullscreenIcon,
} from "@react-three/uikit-lucide";
import { Card } from "@/src/components/card";
import { Tabs, TabsButton } from "@/src/components/tabs";

export default function Preview() {
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <>
      <Canvas
        style={{ height: "100%", touchAction: "none" }}
        gl={{ localClippingEnabled: true }}
      >
        <Scene />
        <Environment background blur={1} preset="city" />
        <OrbitControls />
      </Canvas>
    </>
  );
}
