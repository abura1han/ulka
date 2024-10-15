import Header from "@/components/dashboard/Header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { appsTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Calendar, LinkIcon, Package, Plus, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AppsDashboard() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  // Get all apps
  const apps = await db.select().from(appsTable);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-[1200px] mx-auto px-4 py-8">
        <Card className="mb-8 shadow-lg rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Your Apps
            </CardTitle>
            <Link
              href={"/u/apps/create"}
              className={cn(
                buttonVariants(),
                "hover:bg-gray-200 transition-colors"
              )}
            >
              <Plus className="mr-2" /> Create new app
            </Link>
          </CardHeader>
          <CardContent>
            <Table className="border-separate border-spacing-y-3">
              <TableHeader>
                <TableRow className="text-gray-600">
                  <TableHead className="text-left">App Name</TableHead>
                  <TableHead className="text-left">Package Name</TableHead>
                  <TableHead className="text-left">Custom Scheme</TableHead>
                  <TableHead className="text-left">Created At</TableHead>
                  <TableHead className="text-left">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow
                    key={app.id}
                    className="bg-white hover:bg-gray-50 transition-shadow shadow-sm rounded-lg hover:shadow-md"
                  >
                    <TableCell className="font-medium flex items-center gap-x-2 py-4">
                      {!!app.logo ? (
                        <Image
                          src={app.logo}
                          width={30}
                          height={30}
                          alt={app.name}
                          className="size-7 rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="size-7 rounded-lg bg-lime-500 shadow-md"></div>
                      )}
                      <span className="text-gray-800">{app.name}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-gray-700">
                        <Package className="mr-2 h-4 w-4 text-gray-500" />
                        {app.packageName}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-gray-700">
                        <Smartphone className="mr-2 h-4 w-4 text-gray-500" />
                        {app.customScheme}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button
                        asChild
                        variant="ghost"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Link href={`/u/apps/${app.id}`}>
                          <LinkIcon className="mr-2 h-4 w-4 text-gray-600" />
                          Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
