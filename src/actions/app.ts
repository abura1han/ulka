"use server";

import { db } from "@/db";
import { appsTable, InsertApp, SelectApp } from "@/db/schema";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import mime from "mime";
import { revalidatePath } from "next/cache";

// Max file size (1MB)
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
interface CreateAppSuccess extends SelectApp {
  success: true;
}

export const createApp = async (
  data: FormData
): Promise<{ success: false; error: string } | CreateAppSuccess> => {
  const parsedData = Object.fromEntries(data);
  const { name, iosAppId, customScheme, packageName, fallbackUrl, logo } =
    parsedData as InsertApp;

  const appLogo = logo as unknown as File;

  const { userId } = auth();

  // User must be authorized
  if (!userId) return { success: false, error: "User unauthorized" };

  // Validation
  if (!name || typeof name !== "string") {
    return {
      success: false,
      error: "App name is required and must be a string.",
    };
  }

  if (!customScheme || typeof customScheme !== "string") {
    return {
      success: false,
      error: "Custom scheme is required and must be a string.",
    };
  }

  if (
    !fallbackUrl ||
    typeof fallbackUrl !== "string" ||
    !isValidUrl(fallbackUrl)
  ) {
    return { success: false, error: "A valid fallback URL is required." };
  }

  if (iosAppId && !/^\d+$/.test(iosAppId)) {
    return { success: false, error: "iOS App ID must be a number." };
  }

  if (packageName && !isValidPackageName(packageName)) {
    return { success: false, error: "Invalid package name format." };
  }

  // Check file size (if file exists)
  if (appLogo && appLogo.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "Logo file exceeds the maximum size of 1MB.",
    };
  }

  // Upload the file to S3 if provided
  let logoUrl = "";
  if (appLogo) {
    try {
      logoUrl = await uploadToS3(appLogo, userId);
    } catch (err) {
      console.log(err);
      return { success: false, error: "Failed to upload logo." };
    }
  }

  // Additional check for name uniqueness
  // const existingApp = await db
  //   .select()
  //   .from(appsTable)
  //   .where(eq(appsTable.name, name))
  //   .execute();

  // if (existingApp) {
  //   return {
  //     success: false,
  //     error: "App name already exists. Please choose a different name.",
  //   };
  // }

  console.log(appLogo);
  console.log({ logoUrl });

  // Insert into the database
  const [app] = await db
    .insert(appsTable)
    .values({
      name,
      logo: logoUrl || "",
      customScheme,
      packageName,
      userId,
      iosAppId,
      fallbackUrl,
    })
    .returning();

  // Revalidate the path for any static/dynamic routes
  revalidatePath("/u/apps");

  return { success: true, ...app };
};

// Helper function to validate URLs
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// Helper function to validate package names (e.g., com.example.app)
const isValidPackageName = (packageName: string): boolean => {
  const regex = /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)+$/;
  return regex.test(packageName);
};

// Helper function to upload file to S3
const uploadToS3 = async (file: File, userId: string): Promise<string> => {
  console.log(process.env.AWS_REGION);
  const s3Client = new S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  // Convert File to ArrayBuffer, then to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

  const fileKey = `${userId}/logos/${crypto.randomUUID()}.${mime.getExtension(
    file.type
  )}`;

  const uploadParams = {
    Bucket: "ulka-v1", // Replace with your bucket name
    Key: fileKey, // File path in the bucket
    Body: buffer,
    ContentType: file.type,
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    await s3Client.send(command);
    return `<YOUR_CDN_URL>/${fileKey}`;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("S3 upload failed");
  }
};

interface UpdateAppSuccess extends SelectApp {
  success: true;
}

export const updateAppById = async (
  appId?: string,
  data?: FormData
): Promise<{ success: false; error: string } | UpdateAppSuccess> => {
  const { userId } = auth();
  if (!userId) return { success: false, error: "User unauthorized" };
  if (!appId) return { success: false, error: "App id can not be empty" };
  if (!data) return { success: false, error: "Data can not be empty" };

  // Check if user is the owner of the app
  const isUserOwner = await db
    .select()
    .from(appsTable)
    .where(eq(appsTable.userId, userId));
  if (!isUserOwner) {
    return {
      success: false,
      error: "User is not authorized to delete this app",
    };
  }

  const {
    name,
    customScheme,
    packageName,
    iosAppId,
    fallbackUrl,
    logo,
  }: {
    name?: string;
    content?: string;
    customScheme?: string;
    packageName?: string | null;
    iosAppId?: string | null;
    fallbackUrl?: string;
    logo?: File;
  } = Object.fromEntries(data);

  // Create an object with only the provided fields
  const updateData: Partial<typeof appsTable.$inferInsert> = {};
  if (name !== undefined) updateData.name = name;
  if (customScheme !== undefined) updateData.customScheme = customScheme;
  if (packageName !== undefined) updateData.packageName = packageName;
  if (iosAppId !== undefined) updateData.iosAppId = iosAppId;
  if (fallbackUrl !== undefined) updateData.fallbackUrl = fallbackUrl;
  if (fallbackUrl !== undefined) updateData.fallbackUrl = fallbackUrl;

  if (logo !== undefined) {
    updateData.logo = await uploadToS3(logo, userId);
  }

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
