import { cookies } from "next/headers";
import ImporterPage from "./importer";
export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("figmatoken");
  console.log("cookie", token);
  return <ImporterPage token={token?.value} />;
}
