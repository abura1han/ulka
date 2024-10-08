"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <header className="flex items-center justify-between px-4 py-2 shadow-md h-[62px]">
      {isSignedIn && (
        <>
          <Link href="/u/apps">
            <h2 className="text-xl font-semibold">Ulka</h2>
          </Link>

          <div className="flex items-center space-x-4">
            {/* Profile Avatar with Dropdown */}
            {isLoaded ? (
              <UserButton />
            ) : (
              <div>
                <Loader2 />
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
