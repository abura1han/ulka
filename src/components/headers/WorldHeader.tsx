"use client";

import { Loader2, MinusIcon, PlusIcon } from "lucide-react";
import moment, { Moment } from "moment";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function WorldHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 left-0 w-full shadow-sm gap-4">
      <SiteBranding />
      <DateModifier />
      <UserProfile />
    </header>
  );
}

const SiteBranding = () => {
  return (
    <section className="relative">
      <Image src={"/icons/logo-full.svg"} alt="Ulka" width={105} height={36} />
    </section>
  );
};

const DateModifier = () => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Moment>();

  useLayoutEffect(() => {
    setDate(moment());
    setLoading(false);
  }, []);
  return (
    <section className="flex">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <div>
            <div className="text-sm font-medium">
              {date?.format("dddd")} (Today)
            </div>
            <div className="text-xs">{date?.format("DD/mm/yyyy")}</div>
          </div>
          <div className="flex items-center gap-4 ml-6">
            <Button
              variant={"secondary"}
              className={cn("rounded-full size-8 p-0")}
            >
              <MinusIcon />
            </Button>
            <Button
              variant={"secondary"}
              className={cn("rounded-full size-8 p-0")}
            >
              <PlusIcon />
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

const UserProfile = () => {
  return (
    <section>
      <Avatar>
        <AvatarFallback>AR.</AvatarFallback>
      </Avatar>
    </section>
  );
};
