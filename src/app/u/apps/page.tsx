import { ClientOnly } from "@/components/ClientOnly";
import {
  CreateAppButton,
  CreateAppModal,
} from "@/components/dashboard/CreateAppModal";
import Header from "@/components/dashboard/Header";
import { db } from "@/db";
import { appsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Page({}) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  // Get all apps
  const apps = await db.select().from(appsTable);

  return (
    <div>
      <Header />
      {/* Modal */}
      <ClientOnly>
        <CreateAppModal />
      </ClientOnly>
      <div className="flex items-center justify-between container mx-auto px-4 mt-4">
        <h2>App list</h2>
        <CreateAppButton />
      </div>

      <div className="container mx-auto px-4 mt-4 space-">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={`/u/apps/${app.id}`}
            className="block px-1 py-2 border-b hover:bg-primary hover:text-white"
          >
            <div>{app.title}</div>
            <div className="text-sm">{app.createdAt}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
