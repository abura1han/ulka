"use client";

import { MoreVertical, Trash2 } from "lucide-react";

import { deleteAppDataById } from "@/actions/app";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AppDeleteButton = ({ appId }: { appId: string }) => {
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: () => deleteAppDataById(appId),
    onSuccess: () => {
      toast("App deleted successfully");
      router.replace("/u/apps");
    },
    onError: () => {
      toast("Something wen't wrong, try again");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>App options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={async () => {
                await deleteMutation.mutateAsync();
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span className={cn(deleteMutation.isPending && "animate-pulse")}>
                Delete app
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AppDeleteButton;
