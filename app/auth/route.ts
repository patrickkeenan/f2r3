import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const params = await request.nextUrl.searchParams;
  // add in logic to check expiry
  const existingToken = cookieStore.get("figmatoken");
  console.log("existingToken", existingToken);
  if (existingToken) {
    return Response.json("redirect to import", {
      status: 302,
      headers: {
        Location: "/import",
      },
    });
  }

  const personalToken = params.get("personalToken");
  if (personalToken) {
    return Response.json("Set user token", {
      status: 302,
      headers: {
        Location: "/import",
        "Set-Cookie": `figmatoken=${personalToken}`,
      },
    });
  }

  // const figmatoken=""
  console.log(request.nextUrl.searchParams, process.env.NEXT_PUBLIC_SERVER_URL);
  const authCode = params.get("code");

  if (authCode) {
    let figmatoken = "";
    const authUrl = `https://www.figma.com/api/oauth/token?client_id=${process.env.NEXT_PUBLIC_FIGMA_CLIENT_ID}&client_secret=${process.env.FIGMA_CLIENT_SECRET}&redirect_uri=${process.env.NEXT_PUBLIC_SERVER_URL}/auth&code=${authCode}&grant_type=authorization_code`;
    console.log(authUrl);
    const authRequest = await fetch(authUrl, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        figmatoken = data.access_token;
        if (figmatoken == "undefined") {
          return Response.json(data, {
            status: 200,
          });
        }
      });
    console.log("authCode", authCode, figmatoken);
    // const figmatoken = "";
    console.log("setting", figmatoken);

    return Response.json("Set user token", {
      status: 302,
      headers: {
        Location: "/import",
        "Set-Cookie": `figmatoken=${figmatoken}`,
      },
    });
  } else {
    return new Response("No auth code", {
      status: 200,
    });
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    console.log("wrote JSON");
    return Response.json(data, {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("An error occurred", {
      status: 200,
    });
  }
}
