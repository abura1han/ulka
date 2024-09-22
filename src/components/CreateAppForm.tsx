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
import { SelectApp } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Download, ExternalLink, Smartphone } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  packageName: z.string().min(1, { message: "Package name is required" }),
  appId: z.string().optional(),
  customScheme: z.string().min(1, { message: "Custom scheme is required" }),
});

export default function CreateAppForm({
  initialData,
}: {
  initialData?: SelectApp;
}) {
  const { appId } = useParams() as { appId: string };

  // Form submit mutation
  const submitFormMutation = useMutation({
    mutationFn: ({
      appName,
      appId,
      content,
      customScheme,
      packageName,
      operation,
      updateAppId,
    }: {
      appName: string;
      content: string;
      customScheme: string;
      packageName: string;
      appId: string;
      updateAppId: string;
      operation: "create" | "update";
    }) =>
      operation === "create"
        ? createApp({ appName, appId, content, customScheme, packageName })
        : updateAppById(updateAppId, {
            appName,
            content,
            customScheme,
            packageName,
          }),
  });

  const [previewData] = useState({
    title: "Your App",
    customScheme: "yourapp://",
    packageName: "com.yourapp",
    appId: "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title,
      content: initialData?.content,
      packageName: initialData?.packageName,
      appId: initialData?.appId || "",
      customScheme: initialData?.customScheme,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await submitFormMutation.mutateAsync({
        updateAppId: appId,
        operation: appId === "create" ? "create" : "update",
        appId: values.appId || "",
        appName: values.title,
        content: values.content,
        customScheme: values.customScheme,
        packageName: values.packageName,
      });

      if (!data.success) {
        throw new Error(data.error);
      }

      toast("Operation success", { description: "" });
    } catch (error) {
      // @ts-expect-error skipping type
      toast("Operation failed", { description: error.message });
    }
  }

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
                  <FormLabel>Description</FormLabel>
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
                  <FormLabel>Package Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Android package name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App ID</FormLabel>
                  <FormDescription>
                    If you have your app on app store then you can add
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="iOS App ID (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Scheme</FormLabel>
                  <FormDescription>
                    The deeplinking scheme for your app. Example:{" "}
                    <code className="bg-gray-100 p-1 rounded">ulka://</code>
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Custom URL scheme" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
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
            <h3 className="text-lg font-semibold mb-4">{previewData.title}</h3>
            <p className="mb-4">
              Your deep link:{" "}
              <code className="bg-gray-100 p-1 rounded">
                https://ulka.dev/
                {previewData.title.toLowerCase().replace(/\s+/g, "-")}
              </code>
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Smartphone className="mr-2" />
                <span>
                  If app is installed: Opens {previewData.title} using{" "}
                  <code className="bg-gray-100 p-1 rounded">
                    {previewData.customScheme}
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
                      market://details?id={previewData.packageName}
                    </code>
                  </li>
                  {previewData.appId && (
                    <li>
                      iOS:{" "}
                      <code className="bg-gray-100 p-1 rounded">
                        https://apps.apple.com/app/id{previewData.appId}
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
                    https://{previewData.packageName}
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
