"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Editor, {
  Monaco,
  MonacoDiffEditor,
  useMonaco,
} from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as typescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import Preview from "./preview";

export default function EditorPage({ figmaToken }) {
  const router = useRouter();
  console.log(figmaToken);

  const [layoutDataString, setLayoutDataString] = useState("");
  const [reactCodeString, setReactCodeString] = useState("");
  const [layoutData, setLayoutData] = useState(null);
  const [frameLink, setFrameLink] = useState(
    "https://www.figma.com/file/qGDiNCmTVCTuBdAoMyMXc4/UIKit-Figma-logo?type=design&node-id=10-299&mode=design&t=s2B17KvQ1eftMPBc-11"
  );
  function parseFigmaUrl(url: string): { nodeId: string; fileId: string } {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);

    const nodeId = searchParams.get("node-id");
    const fileId = urlObj.pathname.split("/")[2];

    return { nodeId: nodeId ?? "", fileId: fileId ?? "" };
  }

  const files = {
    "layout.json": {
      name: "layout.json",
      language: "typescript",
      value: layoutDataString,
    },
    "layout.tsx": {
      name: "layout.tsx",
      language: "typescript",
      value: reactCodeString,
    },
  };
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("layout.json");
  const file = files[fileName];

  const monaco = useMonaco();
  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    try {
      monaco?.languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        esModuleInterop: true,
        // allowNonTsExtensions: true,
        // moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        // module: monaco.languages.typescript.ModuleKind.CommonJS,
        // noEmit: true,
        // typeRoots: ["node_modules/@types"],
        noUnusedLocals: false,
        // noUnusedParameters: false,
        automaticLayout: true,
        formatOnPaste: true,
        formatOnType: true,
      });
    } catch (e) {
      console.log(e);
    }
    // Remove complaints about libraries
    monaco?.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module '*';`,
      "filename.ts"
    );
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
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
              const fileUrl = `https://api.figma.com/v1/files/${fileId}/nodes?ids=${nodeId}`;
              // const fileUrl = `https://api.figma.com/v1/files/${fileId}`;
              console.log("getting", fileUrl, "X-FIGMA-TOKEN" + figmaToken);

              fetch(fileUrl, {
                headers: {
                  // "X-FIGMA-TOKEN": figmaToken,
                  Authorization: `Bearer ${figmaToken}`,
                },
              })
                .then((response) => response.json())
                .then(async (data) => {
                  console.log("got file data", data);
                  const imagesUrl = `https://api.figma.com/v1/files/${fileId}/images`;
                  fetch(imagesUrl, {
                    headers: {
                      // "X-FIGMA-TOKEN": figmaToken,
                      Authorization: `Bearer ${figmaToken}`,
                    },
                  })
                    .then((response) => response.json())
                    .then(async (imageData) => {
                      data.images = imageData.meta.images;
                      const dataString =
                        "export const staticLayoutData = " +
                        JSON.stringify(data);
                      const formattedString = await prettier.format(
                        dataString,
                        {
                          parser: "typescript",
                          plugins: [babel, typescript, estree],
                        }
                      );
                      setLayoutData(data);
                      setLayoutDataString(formattedString);
                    });
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
          <div style={{ height: "50%", width: "100%" }}>
            <Preview
              layoutData={layoutData}
              handleStringOutput={(stringOutput) =>
                setReactCodeString(stringOutput)
              }
            />
          </div>
          <button
            disabled={fileName === "layout.json"}
            onClick={() => setFileName("layout.json")}
          >
            layout.json
          </button>
          <button
            disabled={fileName === "layout.tsx"}
            onClick={() => setFileName("layout.tsx")}
          >
            layout.tsx
          </button>
          <Editor
            path={file.name}
            defaultLanguage={file.language}
            defaultValue={file.value}
            height="50%"
            width="100%"
            theme="vs-dark"
            saveViewState={true}
            onMount={handleEditorDidMount}
            //   onChange={handleEditorChange}
            value={file.value}
            options={{
              tabSize: 2,
              insertSpaces: true,
              autoIndent: "advanced",
              wordWrap: "on",
              folding: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
