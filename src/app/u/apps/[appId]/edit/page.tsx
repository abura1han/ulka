import AppForm from "@/components/AppForm";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import { appsTable } from "@/db/schema";
import Header from "@/components/dashboard/Header";

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
    <div>
      <Header />
      <AppForm initialData={app} operationMode="update" />
    </div>
  );
}
