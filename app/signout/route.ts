"use server";
import { cookies } from "next/headers";

export async function GET(request) {
  cookies().delete("figmatoken");
  return Response.json("No token available", {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
}
