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
import Layout from "./export";

export default function Preview() {
  return (
    <Canvas
      style={{ height: "100%", touchAction: "none" }}
      gl={{ localClippingEnabled: true }}
    >
      <Layout />
      <Environment background blur={1} preset="city" />
      <OrbitControls />
    </Canvas>
  );
}
