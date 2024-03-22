import styles from "./styles.module.css";
import { cookies } from "next/headers";
import ImporterPage from "./importer";
export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("figmatoken");
  return <ImporterPage token={token?.value} />;
}
