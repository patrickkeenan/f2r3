"use server";
import Pusher from "pusher";

export const sendLayout = async (layout, formData) => {
  const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
    secret: process.env.PUSHER_APP_SECRET as string,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
    useTLS: true,
  });
  pusher.trigger("figma-123", "layout", {
    message: "layout",
    data: layout,
  });
};
