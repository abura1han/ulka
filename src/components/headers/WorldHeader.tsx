"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DATE_FORMAT } from "@/utils/calendar";

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
    <section className="relative flex items-end">
      <Image src={"/icons/logo-full.svg"} alt="Ulka" width={105} height={36} />
      <div className="px-1 bg-black text-white rounded text-xs font-medium ml-3 mb-2 shadow">
        preview
      </div>
    </section>
  );
};

const DateModifier = () => {
  const router = useRouter();
  const search = useSearchParams();
  const locationDate = search.get("date");

  const providedDate = moment(
    locationDate || undefined,
    locationDate ? DATE_FORMAT : undefined
  );

  const getDayLabel = () => {
    const isYesterday = providedDate.isSame(moment().subtract(1, "day"), "day");
    if (isYesterday) return "(yesterday)";

    const isToday = providedDate.isSame(moment(), "day");
    if (isToday) return "(today)";

    const isTomorrow = providedDate.isSame(moment().add(1, "day"), "day");
    if (isTomorrow) return "(tomorrow)";
  };

  const handlePrevClick = () => {
    const prevDate = moment(providedDate, DATE_FORMAT)
      .subtract(1, "days")
      .format(DATE_FORMAT);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("date", prevDate);

    // Decode the URL to ensure the date is in plain text
    const decodedUrl = decodeURIComponent(newUrl.toString());

    router.push(decodedUrl);
  };

  const handleNextClick = () => {
    const nextDate = moment(providedDate, DATE_FORMAT)
      .add(1, "days")
      .format(DATE_FORMAT);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("date", nextDate);

    // Decode the URL to ensure the date is in plain text
    const decodedUrl = decodeURIComponent(newUrl.toString());

    router.push(decodedUrl);
  };

  const handleBackToToday = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("date");

    // Decode the URL to ensure the date is in plain text
    const decodedUrl = decodeURIComponent(newUrl.toString());

    router.push(decodedUrl);
  };

  return (
    <section className="flex items-center gap-2">
      <Button
        variant={"secondary"}
        className={cn("rounded-full size-8 p-0")}
        onClick={handlePrevClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button variant={"secondary"} className="flex items-center gap-2">
        <div className="text-sm">
          {providedDate?.format("dddd")} {getDayLabel()}
        </div>
        <div className="text-sm">{providedDate?.format(DATE_FORMAT)}</div>
      </Button>
      <Button
        variant={"secondary"}
        className={cn("rounded-full size-8 p-0")}
        onClick={handleNextClick}
      >
        <ChevronRightIcon />
      </Button>

      {getDayLabel() !== "(today)" && (
        <Button
          variant={"outline"}
          className="flex items-center gap-2"
          onClick={handleBackToToday}
        >
          Back to today
        </Button>
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
