"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Editor, {
  Monaco,
  MonacoDiffEditor,
  useMonaco,
} from "@monaco-editor/react";
import { useState } from "react";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as typescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";

export default function EditorPage({ figmaToken }) {
  const router = useRouter();
  console.log(figmaToken);

  const [layoutData, setLayoutData] = useState("");
  const [frameLink, setFrameLink] = useState("");
  function parseFigmaUrl(url: string): { nodeId: string; fileId: string } {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    const nodeId = searchParams.get("node-id");
    const fileId = urlObj.pathname.split("/")[2];

    return { nodeId: nodeId ?? "", fileId: fileId ?? "" };
  }
  return (
    <>
      <div
        style={{
          height: 56,
          width: 500,
          margin: "auto",
          marginTop: 13,
          flexWrap: "nowrap",
          display: "flex",
          position: "relative",
        }}
      >
        <input
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,.2)",
            borderRadius: 16,
            paddingLeft: 16,
            paddingRight: 16,
            outline: "none!important",
            color: "#fff",
            fontSize: 16,
          }}
          type="text"
          value={frameLink}
          placeholder="⌘L · Paste Frame link"
          onChange={(event) => setFrameLink(event.target.value)}
          onFocus={(event) => event.target.select()}
        />
        <button
          style={{
            position: "absolute",
            right: 12,
            top: 12,
            height: 32,
            borderRadius: 8,
            border: "0 none",
            paddingLeft: 12,
            paddingRight: 12,
          }}
          disabled={frameLink == ""}
          onClick={() => {
            if (figmaToken) {
              const { fileId, nodeId } = parseFigmaUrl(frameLink);
              console.log(
                "getting",
                `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`,
                "X-FIGMA-TOKEN" + figmaToken
              );

              fetch(
                `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`,
                {
                  headers: {
                    "X-FIGMA-TOKEN": figmaToken,
                  },
                }
              )
                .then((response) => response.json())
                .then(async (data) => {
                  console.log("got data", data);
                  const dataString =
                    "const layoutData =" + JSON.stringify(data);
                  const formattedString = await prettier.format(dataString, {
                    parser: "typescript",
                    plugins: [babel, typescript, estree],
                  });
                  setLayoutData(formattedString);
                });
            }
          }}
        >
          Import
        </button>
      </div>

      <button
        style={{
          position: "fixed",
          right: 20,
          top: 20,
          height: 32,
          borderRadius: 8,
          border: "0 none",
          paddingLeft: 12,
          paddingRight: 12,
        }}
        onClick={() => {
          router.push("/signout");
        }}
      >
        Sign out
      </button>

      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div
          style={{
            width: "100vw",
            bottom: 0,
            top: 72,
            position: "fixed",
          }}
        >
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            saveViewState={true}
            path={"frame"}
            defaultLanguage={"typescript"}
            defaultValue={layoutData}
            //   onMount={handleEditorDidMount}
            //   onChange={handleEditorChange}
            value={layoutData}
            options={{
              tabSize: 2,
              insertSpaces: true,
              autoIndent: "advanced",
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </>
  );
}
