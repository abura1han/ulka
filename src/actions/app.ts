"use server";

import { db } from "@/db";
import { appsTable, SelectApp } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

interface CreateAppSuccess extends SelectApp {
  success: true;
}

export const createApp = async ({
  appName,
  appId,
  content,
  customScheme,
  packageName,
}: {
  appName: string;
  content: string;
  customScheme: string;
  packageName: string;
  appId: string;
}): Promise<{ success: false; error: string } | CreateAppSuccess> => {
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
      appId,
    })
    .returning();

  return { success: true, ...app };
};

interface UpdateAppSuccess extends SelectApp {
  success: true;
}

export const updateAppById = async (
  appId: string,
  {
    appName,
    content,
    customScheme,
    packageName,
  }: {
    appName?: string;
    content?: string;
    customScheme?: string;
    packageName?: string;
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
