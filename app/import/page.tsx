import { cookies } from "next/headers";
// import { MyClientComponent } from './MyClientComponent'
import EditorPage from "./editor";

export default function Page() {
  const cookieStore = cookies();
  const figmaToken = cookieStore.get("figmatoken");
  return <EditorPage figmaToken={figmaToken?.value} />;
}
