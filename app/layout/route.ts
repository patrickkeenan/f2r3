import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { figmaLayoutString } from "../../../components/figma-utils-string";
import { figmaToComponents } from "../../../components/utils/figma-utils";

import { collection, doc, Timestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  return new Response("Layout route!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const data = await req.json();
  // const pageId = data.pageId;
  // const documentId = data.documentId;
  const documentId = data.id;
  // const rootLayerName = data.name;

  const isDevelopment = true;
  if (isDevelopment) {
    // This is a dev server: Write the files directly to the server
    let json = JSON.stringify(data, null, 2);
    try {
      await figmaToComponents(data);
      console.log("writing doc", documentId);

      let dirPath = `public/uploads/layouts/${toSafeString(documentId)}`;
      await mkdir(dirPath, { recursive: true });

      await writeFile(
        path.resolve(process.cwd(), dirPath, `layout.json`),
        json
      );

      // await writeFile(
      //   path.resolve(process.cwd(), "prototypes", `figma.tsx`),
      //   figmaLayoutString(data)
      // );

      console.log("wrote JSON");
      return new Response("JSON file written successfully", {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    } catch (err) {
      console.error(err);
      return new Response("An error occurred", {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }
  } else {
    // This is production: Write the files to firebase storage
    const docRef = doc(collection(db, `prototypes`), toSafeString(documentId));
    setDoc(docRef, {
      timestamp: Timestamp.fromDate(new Date()),
      ...data,
    });
    return new Response("Layout written to database successfully", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
const toSafeString = (str) => str.replace(/[^\w\s]/gi, "");
