import Header from "@/components/dashboard/Header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page({}) {
  return (
    <div>
      <Header />

      <div className="flex items-center justify-center container mx-auto px-4 mt-4">
        <Link
          href={"/u/apps"}
          className={cn(buttonVariants({ className: "rounded-full" }))}
        >
          View app list
        </Link>
      </div>
    </div>
  );
}
