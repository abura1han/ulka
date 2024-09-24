"use client";

import { Download } from "lucide-react";
import { QRCode } from "react-qrcode-logo";
import { Button } from "./ui/button";
import { useRef } from "react";

const QrCode = ({ value }: { value: string }) => {
  const ref = useRef<QRCode>(null);

  const handleDownload = () => {
    ref.current?.download();
  };

  return (
    <>
      <QRCode ref={ref} value={value} bgColor="whitesmoke" />{" "}
      <Button
        variant={"secondary"}
        size={"sm"}
        className="flex gap-x-2"
        onClick={handleDownload}
      >
        <Download /> Download
      </Button>
    </>
  );
};

export default QrCode;
