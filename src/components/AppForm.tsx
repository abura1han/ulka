"use client";

import { createApp, updateAppById } from "@/actions/app";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InsertApp, SelectApp } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Download, ExternalLink, Smartphone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, { message: "App name is required" }),
  content: z.string().min(1, { message: "Description is required" }),
  packageName: z.string().optional(),
  iosAppId: z.string().optional(),
  customScheme: z
    .string()
    .min(1, { message: "Custom scheme is required" })
    .regex(/^[a-z][a-z0-9+.-]*:\/\//, {
      message:
        "Custom scheme must start with a letter and end with forward double slashes",
    }),
  fallbackUrl: z.string().url({ message: "Invalid fallback URL" }),
});

export default function AppForm({
  initialData,
  operationMode,
}: {
  initialData?: SelectApp;
  operationMode: "create" | "update";
}) {
  const { appId } = useParams() as { appId: string };
  const router = useRouter();
  const [previewData, setPreviewData] = useState<Partial<SelectApp> | null>(
    initialData || null
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      content: "",
      packageName: "",
      iosAppId: "",
      customScheme: "",
      fallbackUrl: "",
    },
  });

  const formMutation = useMutation({
    mutationFn: (data: InsertApp) =>
      operationMode === "update" ? updateAppById(appId, data) : createApp(data),
    onSuccess: () => {
      toast.success(
        operationMode === "update"
          ? "App updated successfully"
          : "App created successfully"
      );
      router.push("/u/apps");
    },
    onError: (error) => {
      toast.error("Failed to update app", { description: error.message });
    },
  });

  const onSubmit = (data: InsertApp) => {
    formMutation.mutate(data);
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setPreviewData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="flex gap-8 container max-w-[1000px] mx-auto mt-10">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App name *</FormLabel>
                  <FormControl>
                    <Input placeholder="ex. Ulka gallery" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description/some content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="com.example.app"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for your Android app
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iosAppId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>iOS App ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123456789"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    The App Store ID for your iOS app (if applicable)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Scheme *</FormLabel>
                  <FormControl>
                    <Input placeholder="yourapp://" {...field} />
                  </FormControl>
                  <FormDescription>
                    The deep linking scheme for your app (e.g., yourapp://)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fallbackUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fallback URL *</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourapp.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The website to open if the app isn{"'"}t installed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={formMutation.isPending}
            >
              {operationMode === "create"
                ? formMutation.isPending
                  ? "Creating..."
                  : "Create App"
                : formMutation.isPending
                ? "Updating..."
                : "Update App"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Deep Link Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">
              {previewData?.title || "Your App"}
            </h3>
            <p className="mb-4">
              Your deep link:{" "}
              <code className="bg-gray-100 p-1 rounded">
                https://ulka.dev/
                {(previewData?.title || "your-app")
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
              </code>
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Smartphone className="mr-2" />
                <span>
                  If app is installed: Opens {previewData?.title || "Your App"}{" "}
                  using{" "}
                  <code className="bg-gray-100 p-1 rounded">
                    {previewData?.customScheme || "yourapp://"}
                  </code>
                </span>
              </div>
              <div className="flex items-center">
                <Download className="mr-2" />
                <span>If app is not installed: Redirects to app store</span>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Android:{" "}
                    <code className="bg-gray-100 p-1 rounded">
                      market://details?id=
                      {previewData?.packageName || "com.yourapp"}
                    </code>
                  </li>
                  {previewData?.iosAppId && (
                    <li>
                      iOS:{" "}
                      <code className="bg-gray-100 p-1 rounded">
                        https://apps.apple.com/app/id{previewData?.iosAppId}
                      </code>
                    </li>
                  )}
                </ul>
              </div>
              <div className="flex items-center">
                <ExternalLink className="mr-2" />
                <span>
                  Fallback URL:{" "}
                  <code className="bg-gray-100 p-1 rounded">
                    {previewData?.fallbackUrl || "https://yourapp.com"}
                  </code>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
