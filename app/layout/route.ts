import path from "path";
import { writeFile, mkdir } from "fs/promises";

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
  try {
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
}
const toSafeString = (str) => str.replace(/[^\w\s]/gi, "");
