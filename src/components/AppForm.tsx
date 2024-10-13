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
import { InsertApp, SelectApp } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Download, ExternalLink, Smartphone, Upload } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(1, { message: "App name is required" }),
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
  const [logo, setLogo] = useState<Blob | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      logo: "",
      name: "",
      // content: "",
      packageName: "",
      iosAppId: "",
      customScheme: "",
      fallbackUrl: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        const file = acceptedFiles[0];
        if (file) {
          form.setValue("logo", URL.createObjectURL(file));
          setPreviewData((p) => ({ ...p, logo: URL.createObjectURL(file) }));

          const reader = new FileReader();

          reader.onloadend = () => {
            if (reader.result) {
              // The result is an ArrayBuffer here, we can convert it to a Blob
              const imageBlob = new Blob([reader.result], { type: file.type });
              setLogo(imageBlob);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": ACCEPTED_IMAGE_TYPES,
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onError: (err) => {
      console.log(err);
    },
  });

  const formMutation = useMutation({
    mutationFn: ({ appId, data }: { appId?: string; data: FormData }) =>
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

  const onSubmit = async (data: InsertApp) => {
    if (!data.packageName && !data.iosAppId) {
      form.setError("packageName", {
        message: "Please provide a package name for PlayStore",
      });
      form.setError("iosAppId", {
        message: "Please provide an app id for App store",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("customScheme", data.customScheme);
    if (data.iosAppId) formData.append("iosAppId", data.iosAppId);
    if (data.packageName) formData.append("packageName", data.packageName);
    formData.append("fallbackUrl", data.fallbackUrl);

    if (data.logo && logo) {
      formData.append("logo", logo as Blob, "logo.png");
    }

    formMutation.mutate({ data: formData, appId });
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      setPreviewData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="flex gap-8 container max-w-[1200px] mx-auto mt-10">
      <div className="w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="logo"
              render={() => (
                <FormItem>
                  <FormLabel>App Logo *</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                        isDragActive ? "border-primary" : "border-gray-300"
                      }`}
                    >
                      <input {...getInputProps()} />
                      {logo ? (
                        <div className="flex flex-col items-center">
                          <Image
                            src={form.watch("logo")}
                            alt="Logo preview"
                            width={100}
                            height={100}
                            className="mb-2"
                          />
                          <p>Click or drag to replace</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <p>Click or drag logo here</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Accepted formats: JPEG, PNG, WebP. Max size: 1MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
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
            <div className="flex items-center mb-4">
              {previewData?.logo && (
                <Image
                  // src={form.watch("logo")}
                  src={previewData?.logo}
                  alt="App Logo"
                  width={50}
                  height={50}
                  className="mr-4 rounded-lg"
                />
              )}
              <h3 className="text-lg font-semibold">
                {previewData?.name || "Your App"}
              </h3>
            </div>
            <p className="mb-4">
              Your deep link:{" "}
              <code className="bg-gray-100 p-1 rounded">
                {typeof window !== "undefined" && window.location.origin}/
                {(previewData?.name || "your-app")
                  .toLowerCase()
                  .replace(/\s+/g, "-")}
              </code>
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Smartphone className="mr-2" />
                <span>
                  If app is installed: Opens {previewData?.name || "Your App"}{" "}
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
