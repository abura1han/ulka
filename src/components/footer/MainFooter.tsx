import Image from "next/image";
import React from "react";

const MainFooter = () => {
  return (
    <footer className="h-80 flex items-center justify-center">
      <Image src={"/icons/logo-full.svg"} alt="Ulka" width={200} height={68} />
    </footer>
  );
};

export default MainFooter;
