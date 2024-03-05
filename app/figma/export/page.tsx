"use client";
import { useEffect, useState } from "react";
import { sendLayout } from "../actions";
// import sampleLayout from "@/public/uploads/layouts/layout.json";

export default function Page() {
  useEffect(() => {}, []);

  return (
    <>
      <h1>Exporter via sockets</h1>
      <button
        onClick={async () => {
          // const updatedLikes = await sendLayout.bind(null, sampleLayout)();
        }}
      >
        Send Layout
      </button>
    </>
  );
}
