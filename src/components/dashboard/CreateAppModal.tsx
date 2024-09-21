"use client";

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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import { useMediaQuery } from "@uidotdev/usehooks";

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

function CreateAppForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="app-name">App name</Label>
        <Input type="text" id="app-name" defaultValue="" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="domain">App domain</Label>
        <Input id="domain" defaultValue="" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}

export function CreateAppButton() {
  const updateModalOpen = useStore((state) => state.updateCreateAppModalOpen);

  const handleClick = () => {
    updateModalOpen(true);
  };
  return <Button onClick={handleClick}>+ Create new</Button>;
}
