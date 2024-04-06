"use client";
import React from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const MyComponent = () => {
  const downloadImages = async () => {
    const urls = [
      "https://localhost:3000/images/f2r3_logo_line.svg",
      "https://localhost:3000/images/f2r3_logo_square.svg",
      "https://localhost:3000/images/f2r3_logo_square.png",
    ];

    const zip = new JSZip();
    const folder = zip.folder("images");

    for (let i = 0; i < urls.length; i++) {
      const response = await fetch(urls[i]);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = function () {
        const imgData = reader.result;
        const fileName = urls[i].substring(urls[i].lastIndexOf("/") + 1);
        console.log("loaded", reader.result);
        folder.file(fileName, imgData);
        if (i === urls.length - 1) {
          zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "images.zip");
          });
        }
      };
    }
  };

  return <button onClick={downloadImages}>Download Images</button>;
};

export default MyComponent;
