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

  return (
    <FigmaProvider token={token} fileId={fileId} nodeId={nodeId}>
      <Preview />
    </FigmaProvider>
  );
}
