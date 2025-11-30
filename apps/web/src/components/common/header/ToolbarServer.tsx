import { loadSectionsIndex } from "@/lib/search/loadSectionsIndex";
import ClientToolbar from "./ClientToolbar";

export default async function ToolbarServer() {
  const SECTIONS_INDEX = await loadSectionsIndex();

  console.log("Section Index", SECTIONS_INDEX);

  return <ClientToolbar items={SECTIONS_INDEX}/>;
}