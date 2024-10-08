"use server";

import { db } from "@/db";
import { appsTable, InsertApp, SelectApp } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface CreateAppSuccess extends SelectApp {
  success: true;
}

export const createApp = async ({
  title: appName,
  iosAppId,
  content,
  customScheme,
  packageName,
  fallbackUrl,
}: InsertApp): Promise<
  { success: false; error: string } | CreateAppSuccess
> => {
  const { userId } = auth();

  if (!userId) return { success: false, error: "User unauthorized" };

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();

  const [app] = await db
    .insert(appsTable)
    .values({
      title: appName,
      content,
      customScheme,
      packageName,
      userId,
      iosAppId,
      fallbackUrl,
    })
    .returning();

  revalidatePath("/u/apps");

  return { success: true, ...app };
};

interface UpdateAppSuccess extends SelectApp {
  success: true;
}

export const updateAppById = async (
  appId: string,
  {
    title: appName,
    content,
    customScheme,
    packageName,
    iosAppId,
    fallbackUrl,
  }: {
    title?: string;
    content?: string;
    customScheme?: string;
    packageName?: string | null;
    iosAppId?: string | null;
    fallbackUrl?: string;
  }
): Promise<{ success: false; error: string } | UpdateAppSuccess> => {
  const { userId } = auth();
  if (!userId) return { success: false, error: "User unauthorized" };

  if (!appId) return { success: false, error: "App id can not be empty" };

  // Create an object with only the provided fields
  const updateData: Partial<typeof appsTable.$inferInsert> = {};
  if (appName !== undefined) updateData.title = appName;
  if (content !== undefined) updateData.content = content;
  if (customScheme !== undefined) updateData.customScheme = customScheme;
  if (packageName !== undefined) updateData.packageName = packageName;
  if (iosAppId !== undefined) updateData.iosAppId = iosAppId;
  if (fallbackUrl !== undefined) updateData.fallbackUrl = fallbackUrl;

  // Only proceed with the update if there are fields to update
  if (Object.keys(updateData).length > 0) {
    const [updatedApp] = await db
      .update(appsTable)
      .set(updateData)
      .where(eq(appsTable.id, appId))
      .returning();

    if (!updatedApp) {
      return { success: false, error: "App not found or update failed" };
    }

    return { success: true, ...updatedApp };
  } else {
    // If no fields were provided to update, fetch and return the existing app
    const [existingApp] = await db
      .select()
      .from(appsTable)
      .where(eq(appsTable.id, appId));

    if (!existingApp) {
      return { success: false, error: "App not found" };
    }

    revalidatePath("/u/apps");

    return { success: true, ...existingApp };
  }
};

interface GetAppData {
  success: true | false;
  error?: string;
  data?: SelectApp;
}

export const getAppDataById = async (appId: string): Promise<GetAppData> => {
  try {
    const [appData] = await db
      .select()
      .from(appsTable)
      .where(eq(appsTable.id, appId));

    if (!appData) {
      return { success: false, error: "App not found" };
    }

    return { success: true, data: appData };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Something went wrong" };
  }
};

export const deleteAppDataById = async (appId: string): Promise<GetAppData> => {
  try {
    // Check if the app exists
    const [appData] = await db
      .select()
      .from(appsTable)
      .where(eq(appsTable.id, appId));

    if (!appData) {
      return { success: false, error: "App not found" };
    }

    // If the app exists, delete it
    await db.delete(appsTable).where(eq(appsTable.id, appId));

    revalidatePath("/u/apps");

    return { success: true };
  } catch (error) {
    console.log(error);

    return { success: false, error: "Something went wrong" };
  }
};
