"use client";

import { cn } from "@/lib/utils";
import { DATE_FORMAT } from "@/utils/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const navLinks = [
  {
    label: "Today",
    link: "/today",
  },
  {
    label: "Explore",
    link: "/explore",
  },
  {
    label: "Profiles",
    link: "/profiles",
  },
];

export default function WorldHeader() {
  return (
    <header className="bg-white sticky top-0 shadow-sm gap-4 z-10">
      <div className="flex items-center justify-between px-4 py-3 w-full max-w-7xl mx-auto">
        <SiteBranding />
        <NavBar />
        <UserProfile />
      </div>
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

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center justify-center gap-5 text-sm font-medium">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.link}
              className={cn(pathname === link.link && "font-bold")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
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
    <section className="flex gap-3">
      <Avatar>
        <AvatarFallback>AR.</AvatarFallback>
      </Avatar>
    </section>
  );
};
