"use client";

import IconGoogle from "@/assets/icons/Google";
import { signIn } from "@/auth/helder";
import { getRandomColor } from "@/utils/typography";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: () => signIn(),
  });

  const handleClick = async () => {
    try {
      const res = await loginMutation.mutateAsync();
      router.replace("/world");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <button
      className="flex items-center px-4 py-3 mt-6 rounded disabled:cursor-wait disabled:animate-pulse"
      style={{ backgroundColor: getRandomColor() }}
      disabled={loginMutation.isPending}
      onClick={handleClick}
    >
      <IconGoogle width={24} height={24} className="mr-2" /> Continue with
      Google
    </button>
  );
}
