"use server";

export const createApp = async ({ appName }: { appName: string }) => {
  const appId = crypto.randomUUID();
  return { appId, appName };
};
