import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { Github } from "lucide-react";

const PublicHeader = () => {
  return (
    <header className="container mx-auto py-8 px-4 lg:px-0 flex justify-between items-center">
      <div>
        <Image
          width={150}
          height={51}
          src={"/images/logo-light.svg"}
          alt="Ulka"
        />
        <p className="text-xl">The ultimate app deeplinking solution</p>
      </div>
      <Link
        href={"https://github.com/abura1han/ulka"}
        className={buttonVariants({
          className: "mr-4 hover:bg-white/10",
          variant: "ghost",
        })}
      >
        <Github className="mr-2" /> GitHub
      </Link>
    </header>
  );
};

export default PublicHeader;
