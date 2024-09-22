import CreateAppForm from "@/components/CreateAppForm";
import Header from "@/components/dashboard/Header";
import { db } from "@/db";
import { appsTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function Page({ params }: { params: { appId: string } }) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  // Get all apps
  const [app] = await db
    .select()
    .from(appsTable)
    .where(eq(appsTable.id, params.appId));

  return (
    <div>
      <Header />

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <CreateAppForm initialData={app} />
        </div>
        {/* <div className="flex-1"></div> */}
      </div>
    </div>
  );
}
