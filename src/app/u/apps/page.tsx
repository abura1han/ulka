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

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Apps</CardTitle>
            <Link href={"/u/apps/create"} className={cn(buttonVariants())}>
              <Plus /> Create new app
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App Name</TableHead>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Custom Scheme</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        {app.packageName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4" />
                        {app.customScheme}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="ghost">
                        <Link href={`/u/apps/${app.id}`}>
                          <LinkIcon className="mr-2 h-4 w-4" />
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
