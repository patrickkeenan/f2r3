"use client";
import { useState, useEffect, useRef } from "react";
import Preview from "./preview";
import { FigmaProvider } from "../auth/figmaTokenContext";
import { useSearchParams, useRouter } from "next/navigation";

export default function ImporterPage({ token, ...props }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileId = searchParams?.get("fileId");
  const nodeId = searchParams?.get("nodeId");
  const startingPointNodeId = searchParams?.get("startingPointNodeId");

  const getToken = searchParams?.get("token");
  // console.log("getToken", getToken);
  if (getToken) {
    // console.log("getToken", getToken);
    let redirectUrl = `/auth?personalToken=${getToken}`;
    if (fileId) redirectUrl += `&fileId=${fileId}`;
    if (nodeId) redirectUrl += `&nodeId=${nodeId}`;
    if (startingPointNodeId)
      redirectUrl += `&startingPointNodeId=${startingPointNodeId}`;
    router.push(redirectUrl);
  }

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
