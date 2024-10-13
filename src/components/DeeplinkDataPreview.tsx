"use client"

import { ExternalLink, LinkIcon, Smartphone } from "lucide-react";
import QrCode from "./QrCode";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

const DeeplinkDataPreview = ({
  appId,
  appName,
  customScheme,
  packageName,
}: {
  appId: string;
  appName: string;
  packageName?: string;
  customScheme?: string;
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    setPreviewUrl(`${window.location.origin}/r/${appId}`);
  }, [appId]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Preview</h3>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center">
            <LinkIcon className="mr-2 h-4 w-4" />
            <span className="font-medium">Deep Link URL:</span>
            <span className="ml-2 text-blue-500">{previewUrl}</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center">
              <Smartphone className="mr-2 h-4 w-4" />
              <span>
                If installed: Opens {appName} using {customScheme}
              </span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>If not installed: Redirects to app store</span>
            </div>
            <div className="flex items-center">
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Fallback: Opens {packageName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <h3 className="text-lg font-semibold my-2">QR code</h3>
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <QrCode value={previewUrl} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeeplinkDataPreview;
