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
  interactions,
  onInteractionUpdate,
  ...props
}) {
  const { token, nodeId, fileId } = useFigmaContext();
  const [layoutDataString, setLayoutDataString] = useState("");
  const [interactionString, setInteractionString] = useState(
    JSON.stringify(interactions)
  );
  useEffect(() => {
    prettier
      .format(interactionString, {
        parser: "json",
        plugins: [babel, typescript, estree],
      })
      .then((formattedString) => {
        console.log("formatted string", formattedString);
        // onInteractionUpdate(interactionString);
        sendUpdateToPreview();
        setInteractionString(formattedString);
      });
  }, [interactionString]);

  const [reactCodeString, setReactCodeString] = useState("");

  // useEffect(() => {
  //   formatJsonAsText(layoutData).then(() => setFileName("layout.json"));
  // }, []);
  useEffect(() => {
    prettier
      .format(layoutTsxString, {
        parser: "typescript",
        plugins: [babel, typescript, estree],
      })
      .then((formattedString) => {
        // console.log("formatted string", formattedString);
        setReactCodeString(formattedString);
      });
  }, [layoutTsxString]);

  const files = {
    "interaction.ts": {
      name: "interaction.ts",
      language: "json",
      value: interactionString,
    },
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

  const editorRef = useRef<null | any>(null);
  const [fileName, setFileName] = useState("layout.tsx");
  const file = files[fileName];

  const monaco = useMonaco();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, function () {
      sendUpdateToPreview();
    });
  };
  const handleEditorChange = (value, event) => {
    if (fileName == "interaction.ts") {
      console.log(fileName, value, monaco);
    }
  };
  const handleEditorValidation = (markers) => {
    // model markers
    if (markers.length < 1 && editorRef.current) {
      console.log("is valid", editorRef.current.getValue());
      const editorValue = editorRef.current.getValue();
      sendUpdateToPreview();
    }
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  };
  const sendUpdateToPreview = () => {
    // Make sure we're only sending up json
    if (editorRef.current) {
      console.log("is valid", editorRef.current.getValue());
      const editorValue = editorRef.current.getValue();
      onInteractionUpdate(editorValue);
    }
  };
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

  const cleanDataForCode = (node, parentNode = null) => {
    if (node.children && node.children.length) {
      const newChildren: null | any = [];
      let prevChild: null | any = null;
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const newChild = cleanDataForCode(child, node);
        newChildren.push(newChild);
      }
      node.children = newChildren;
    }
    node.parentNode = null;
    node.nextSibling = null;
    node.prevSibling = null;
    return node;
  };

  const formatJsonAsText = async (jsonData) => {
    console.log("string it", cleanDataForCode(jsonData.document));
    jsonData.document = cleanDataForCode(jsonData.document);
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
          {/* TODO: add interactions */}
          {/* <button
            onClick={() => {
              sendUpdateToPreview();
            }}
          >
            Save
          </button>
          <div
            className={`${styles.tabBarButton} ${fileName === "interaction.ts" ? styles.tabBarButtonSelected : ""}`}
            onClick={() => setFileName("interaction.ts")}
          >
            INTERACTION
          </div> */}
          <div
            className={`${styles.tabBarButton} ${fileName === "layout.json" ? styles.tabBarButtonSelected : ""}`}
            onClick={() => {
              formatJsonAsText(layoutData).then(() =>
                setFileName("layout.json")
              );
            }}
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
        onChange={handleEditorChange}
        onValidate={handleEditorValidation}
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
