import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

import AppDeleteButton from "@/components/AppDeleteButton";
import Header from "@/components/dashboard/Header";
import DeeplinkDataPreview from "@/components/DeeplinkDataPreview";
import { db } from "@/db";
import { appsTable } from "@/db/schema";
import { Calendar, Edit, Package, Smartphone } from "lucide-react";
import Image from "next/image";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-[1200px] mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-x-2">
              {!!app.logo && (
                <Image
                  src={app.logo}
                  width={40}
                  height={40}
                  alt={app.name}
                  className="rounded-full size-10"
                />
              )}
              <span>{app.name}</span>
            </CardTitle>
            <div className="flex items-center gap-x-4">
              <Button asChild>
                <Link href={`/u/apps/${app.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit App
                </Link>
              </Button>
              <AppDeleteButton appId={params.appId} />
            </div>
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
              <DeeplinkDataPreview
                appId={app.id}
                appName={app.name}
                customScheme={app.customScheme}
                packageName={app.packageName || undefined}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
