import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-2 bg-green-200 flex items-center justify-center min-h-screen">
      <Button variant={"destructive"}>
        Hello World!!
      </Button>
    </div>
  );
}
