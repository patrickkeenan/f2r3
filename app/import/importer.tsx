"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Preview from "./preview";
import { FigmaProvider } from "../auth/figmaTokenContext";
import { useSearchParams } from "next/navigation";

export default function ImporterPage({ token, ...props }) {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const nodeId = searchParams.get("nodeId");
  const startingPointNodeId = searchParams.get("startingPointNodeId");

  return (
    <FigmaProvider
      token={token}
      fileId={fileId}
      nodeId={nodeId}
      startingPointNodeId={startingPointNodeId}
    >
      <Preview />
    </FigmaProvider>
  );
}
