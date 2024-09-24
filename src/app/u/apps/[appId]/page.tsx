import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/dashboard/Header";
import QrCode from "@/components/QrCode";
import { db } from "@/db";
import { appsTable } from "@/db/schema";
import {
  Calendar,
  Edit,
  ExternalLink,
  Link as LinkIcon,
  Package,
  Smartphone,
} from "lucide-react";

async function getAppDetails(appId: string) {
  try {
    const [app] = await db
      .select()
      .from(appsTable)
      .where(eq(appsTable.id, appId));

    if (!app) {
      notFound();
    }
    return app;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Page({ params }: { params: { appId: string } }) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const app = await getAppDetails(params.appId);

  if (!app) return null;

  const previewUrl = `https://ulka.dev/${app.title
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{app.title}</CardTitle>
            <Button asChild>
              <Link href={`/u/apps/${app.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit App
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">App Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span className="font-medium">Package Name:</span>
                    <span className="ml-2">{app.packageName}</span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    <span className="font-medium">Custom Scheme:</span>
                    <span className="ml-2">{app.customScheme}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="font-medium">Created At:</span>
                    <span className="ml-2">
                      {new Date(app.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
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
                          If installed: Opens {app.title} using{" "}
                          {app.customScheme}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        <span>If not installed: Redirects to app store</span>
                      </div>
                      <div className="flex items-center">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        <span>Fallback: Opens {app.packageName}</span>
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
            </div>
            {app.content && (
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Additional Content
                </h3>
                <p>{app.content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
