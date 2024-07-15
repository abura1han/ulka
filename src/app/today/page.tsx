"use client";

import MainSidebar from "@/components/MainSidebar";
import { Button } from "@/components/ui/button";
import { calendarData } from "@/data";
import { cn } from "@/lib/utils";
import { BellIcon, XIcon } from "lucide-react";
import Image from "next/image";

export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-7 gap-x-16">
      <section className="col-span-5">
        <h2 className="text-lg">
          Today{"'"}s events <i className="text-sm">({calendarData.length})</i>
        </h2>

        <div className="flex flex-col gap-y-4 mt-8">
          {calendarData.map((cal, index) => (
            <div
              key={cal.id + index}
              className="relative shadow rounded hover:after:absolute hover:after:top-0 hover:after:left-0 hover:after:w-full hover:after:h-full hover:after:border-2 hover:after:border-blue-100 hover:after:rounded hover:after:transition-all"
            >
              <div className="flex bg-white items-center px-4 py-2 rounded-md gap-x-4">
                <div className="size-12 overflow-hidden rounded">
                  <Image
                    src={cal.logo}
                    alt={cal.title}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-base">{cal.title}</h2>
                  <p className="text-xs"># {cal?.tags?.join(", ")}</p>
                </div>
                <div className="text-sm">
                  <div>For 2 hours</div>
                  <div>
                    {cal.startsAt[1]} - {cal.endsAt[1]}
                  </div>
                </div>
              </div>
              <div className="px-4 py-4 bg-gray-100 rounded-b gap-x-6 flex justify-between">
                <div className="col-span-3">
                  <h4 className="font-bold text-sm">Description:</h4>
                  <p className="text-sm">{cal.description}</p>
                </div>
                <div className="text-xs flex flex-col justify-end items-end">
                  <p>Views: 10</p>
                  <p>Accepted: 10</p>
                  <div className="text-xs mt-4 gap-4 flex justify-end items-end">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className={cn("text-xs")}
                    >
                      <XIcon size={14} /> Not interested
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className={cn("text-xs ")}
                    >
                      <BellIcon size={14} /> Notify
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Sidebar section */}
      <MainSidebar />
    </div>
  );
}
