"use client";

import { getAppDataById } from "@/actions/app";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Download, ExternalLink, Loader2, Smartphone } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RedirectPage() {
  const { "app-id": params } = useParams();
  const [redirectStep, setRedirectStep] = useState(0);

  const appQuery = useQuery({
    enabled: !!params[0],
    queryKey: ["apps/", params[0]],
    queryFn: () => getAppDataById(params[0]),
  });

  useEffect(() => {
    if (!appQuery.data?.success) return;
    if (!appQuery.data.data) return;

    // Attempt to open the app using the custom scheme
    window.location.href = appQuery.data.data.customScheme;

    // If the app doesn't open, move to the next step after a delay
    const timer = setTimeout(() => {
      setRedirectStep(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [appQuery.data?.success, appQuery.data?.data]);

  useEffect(() => {
    if (appQuery.isLoading || appQuery.isError) return;
    if (!appQuery.data?.data) return;
    if (appQuery.data?.success === false) return;

    const { packageName, iosAppId } = appQuery.data.data;

    if (redirectStep === 1) {
      // Redirect to app store after a delay
      const timer = setTimeout(() => {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = `https://apps.apple.com/app/id${iosAppId}`;
        } else if (/Android/i.test(navigator.userAgent)) {
          // If it's an Android device
          window.location.href = `market://details?id=${packageName}`;

          setTimeout(() => {
            window.location.href = `https://play.google.com/store/apps/details?id=${packageName}`;
          }, 200);
        }
        setRedirectStep(2);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [
    redirectStep,
    appQuery.data?.data,
    appQuery.isError,
    appQuery.isLoading,
    appQuery.data?.success,
  ]);

  useEffect(() => {
    if (appQuery.isLoading || appQuery.isError) return;
    if (!appQuery.data?.data) return;
    if (appQuery.data?.success === false) return;

    const fallbackUrl = appQuery.data.data.fallbackUrl;

    if (redirectStep === 2) {
      // Redirect to fallback URL after a delay
      const timer = setTimeout(() => {
        window.location.href = fallbackUrl;
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [redirectStep, appQuery.data, appQuery.isError, appQuery.isLoading]);

  const handleOpenWebsite = () => {
    if (!appQuery.data?.success) return;
    if (!appQuery.data?.data) return;

    const { fallbackUrl } = appQuery.data.data;

    if (fallbackUrl) window.location.href = fallbackUrl;
  };

  if (appQuery.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  if (appQuery.isError || !appQuery.data?.success) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-2xl">
          {appQuery.data?.error || "An error occurred"}
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-row items-center">
            {appQuery.data.data?.logo && (
              <Image
                src={appQuery.data.data?.logo}
                width={50}
                height={50}
                alt=""
                className="rounded-lg mr-3"
              />
            )}{" "}
            {appQuery.data.data?.name}
          </CardTitle>
          <CardDescription>
            Please wait while we redirect you...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(redirectStep + 1) * 33} className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center">
              <Smartphone className="mr-2" />
              <span className={redirectStep >= 0 ? "text-green-500" : ""}>
                Attempting to open the app...
              </span>
            </div>
            <div className="flex items-center">
              <Download className="mr-2" />
              <span className={redirectStep >= 1 ? "text-green-500" : ""}>
                Redirecting to app store...
              </span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="mr-2" />
              <span className={redirectStep >= 2 ? "text-green-500" : ""}>
                Opening fallback website...
              </span>
            </div>
          </div>
          <Button className="mt-4 w-full" onClick={handleOpenWebsite}>
            Open Website Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
