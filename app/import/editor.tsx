"use client";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Monaco, MonacoDiffEditor, useMonaco } from "@monaco-editor/react";
import { useState, useEffect, useRef } from "react";
import * as babel from "prettier/plugins/babel";
import * as estree from "prettier/plugins/estree";
import * as typescript from "prettier/plugins/typescript";
import prettier from "prettier/standalone";
import Preview from "./preview";
import { useFigmaContext } from "../auth/figmaTokenContext";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function EditorView({
  layoutData,
  layoutTsxString,
  isFullscreen,
  ...props
}) {
  const { token, nodeId, fileId } = useFigmaContext();
  const [layoutDataString, setLayoutDataString] = useState("");
  const [reactCodeString, setReactCodeString] = useState("");

  useEffect(() => {
    formatJsonAsText(layoutData).then(() => setFileName("layout.json"));
  }, []);
  useEffect(() => {
    prettier
      .format(layoutTsxString, {
        parser: "typescript",
        plugins: [babel, typescript, estree],
      })
      .then((formattedString) => {
        console.log("formatted string", formattedString);
        setReactCodeString(formattedString);
      });
  }, [layoutTsxString]);

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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
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
    // Remove complaints about libraries
    monaco?.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module '*';`,
      "filename.ts"
    );
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  const formatJsonAsText = async (jsonData) => {
    const dataString =
      "export const staticLayoutData = " + JSON.stringify(jsonData);
    const formattedString = await prettier.format(dataString, {
      parser: "typescript",
      plugins: [babel, typescript, estree],
    });
    setLayoutDataString(formattedString);
  };

  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", background: "#1e1e1e" }}
      >
        <div className={styles.tabBar}>
          <div
            className={`${styles.tabBarButton} ${fileName === "layout.json" ? styles.tabBarButtonSelected : ""}`}
            onClick={() => setFileName("layout.json")}
          >
            JSON
          </div>
          <div
            className={`${styles.tabBarButton} ${fileName === "layout.tsx" ? styles.tabBarButtonSelected : ""}`}
            onClick={() => {
              formatJsonAsText(layoutData).then(() =>
                setFileName("layout.tsx")
              );
            }}
          >
            TSX
          </div>
        </div>
      </div>
      <Editor
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        height="100%"
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
    </>
  );
}
