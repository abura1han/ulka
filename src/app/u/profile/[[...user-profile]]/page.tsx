"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserProfile } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const UserProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Link href={"/u/dashboard"} className={cn(buttonVariants({ className: "mb-4"}))}>
        <ChevronLeft /> Back to dashboard
      </Link>
      <UserProfile path="/u/profile" />
    </div>
  );
};

export default UserProfilePage;
