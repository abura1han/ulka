"use client";

import { BellIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const DetailsPanelHeader = () => {
  const router = useRouter();

  const handleClose = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("event");

    router.push(newUrl.toString());
  };

  return (
    <div className="w-full flex justify-between">
      <Button
        variant={"outline"}
        size={"icon"}
        className="rounded-full"
        onClick={handleClose}
      >
        <XIcon />
      </Button>

      <Button variant={"outline"} size={"icon"} className="rounded-full">
        <BellIcon />
      </Button>
    </div>
  );
};

export default DetailsPanelHeader;
