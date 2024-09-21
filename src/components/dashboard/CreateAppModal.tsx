"use client";

import { createApp } from "@/actions/app";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const modalTitle = "Create a new app";
const modalDescription =
  "Make changes to your profile here. Click save when youre done.";

export function CreateAppModal() {
  const { createAppModalOpen: open, updateCreateAppModalOpen: setOpen } =
    useStore((state) => state);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`re done.
            </DialogDescription>
          </DialogHeader>
          <CreateAppForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{modalTitle}</DrawerTitle>
          <DrawerDescription>{modalDescription}</DrawerDescription>
        </DrawerHeader>
        <CreateAppForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  appName: z
    .string()
    .min(1, {
      message: "App name must be provided",
    })
    .max(20, { message: "App name can not be more than 20 character long" }),
});

function CreateAppForm({ className }: React.ComponentProps<"form">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: "",
    },
  });

  const createAppMutation = useMutation({
    mutationFn: ({ appName }: { appName: string }) => createApp({ appName }),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.appName?.trim()) {
      form.setError("appName", { message: "App name can not be empty" });
      return;
    }

    try {
      const { appId } = await createAppMutation.mutateAsync({
        appName: values.appName,
      });
      router.push(`/dashboard/${appId}`);
    } catch (error) {
      console.log(error);
      toast("Operation failed", {
        // @ts-expect-error don't want to set the typing for error object
        description: error.message,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="appName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>App name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex. Retro gallery"
                  {...field}
                  disabled={createAppMutation.isPending}
                />
              </FormControl>
              <FormDescription>
                This name will be displayed to public
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createAppMutation.isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export function CreateAppButton() {
  const updateModalOpen = useStore((state) => state.updateCreateAppModalOpen);

  const handleClick = () => {
    updateModalOpen(true);
  };
  return <Button onClick={handleClick}>+ Create new</Button>;
}
