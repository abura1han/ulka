"use client";

import { UserButton, useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isLoaded, isSignedIn } = useUser();

  const Logo = () => {
    return (
      <>
        {isSignedIn ? (
          <Link href="/u/apps">
            {/* <h2 className="text-xl font-semibold">Ulka</h2> */}
            <Image
              width={80}
              height={27}
              src={"/images/logo-dark.svg"}
              alt="Ulka"
            />
          </Link>
        ) : (
          <Image
            width={80}
            height={27}
            src={"/images/logo-dark.svg"}
            alt="Ulka"
          />
        )}
      </>
    );
  };

  return (
    <header className="flex items-center h-[72px] border-b">
      <div className="flex items-center justify-between px-4 py-2 w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-x-8">
          <Logo />
          {/* <BreadcrumbWithDropdown /> */}
        </div>

        {isSignedIn && (
          <>
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
      </div>
    </header>
  );
};

export default Header;

// function BreadcrumbWithDropdown() {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbSeparator>
//           <Slash />
//         </BreadcrumbSeparator>
//         <BreadcrumbItem>
//           <DropdownMenu>
//             <DropdownMenuTrigger className="flex items-center gap-1">
//               Components
//               <ChevronDown className="h-4 w-4" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start">
//               <DropdownMenuItem>Documentation</DropdownMenuItem>
//               <DropdownMenuItem>Themes</DropdownMenuItem>
//               <DropdownMenuItem>GitHub</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator>
//           <Slash />
//         </BreadcrumbSeparator>
//         <BreadcrumbItem>
//           <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
