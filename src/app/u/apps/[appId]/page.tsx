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
        <Card className="mb-8 shadow-lg rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-x-3">
              {!!app.logo && (
                <Image
                  src={app.logo}
                  width={50}
                  height={50}
                  alt={app.name}
                  className="rounded-lg shadow-md size-14"
                />
              )}
              <span className="text-xl font-semibold text-gray-800">
                {app.name}
              </span>
            </CardTitle>
            <div className="flex items-center gap-x-3">
              <Button asChild className="hover:opacity-80 transition-opacity">
                <Link
                  href={`/u/apps/${app.id}/edit`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4 text-gray-600" />
                  Edit
                </Link>
              </Button>
              <AppDeleteButton appId={params.appId} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* App Details Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  App Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-600">
                      Package Name:
                    </span>
                    <span className="ml-2 text-gray-700">
                      {app.packageName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-600">
                      Custom Scheme:
                    </span>
                    <span className="ml-2 text-gray-700">
                      {app.customScheme}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium text-gray-600">Created:</span>
                    <span className="ml-2 text-gray-700">
                      {new Date(app.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deeplink Data Section */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Deeplink Preview
                </h3>
                <DeeplinkDataPreview
                  appId={app.id}
                  appName={app.name}
                  customScheme={app.customScheme}
                  fallbackUrl={app.fallbackUrl || undefined}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
