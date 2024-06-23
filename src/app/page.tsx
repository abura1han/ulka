import { auth } from "@/auth";
import GoogleSignInButton from "@/components/button/GoogleSignInButton";
import { getRandomColor } from "@/utils/typography";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const session = await auth();

  const isLoggedIn = session?.user;

  return (
    <div
      className="w-full h-screen flex items-center justify-between gap-4"
      style={{ backgroundColor: getRandomColor() }}
    >
      <div className="flex-[0.5] flex justify-center items-center flex-col">
        <Image
          src={"/icons/logo-full.svg"}
          alt="Ulka"
          width={200}
          height={200}
        />
        <div className="mt-6">
          <p>The calendar for the `Universe`</p>
        </div>
        <div className="mt-20">
          <Link href={"/world"} className="p-4 border border-black">
            View the world calendar
          </Link>
        </div>
      </div>
      {!isLoggedIn && (
        <div className="flex-[0.5] flex justify-center items-center flex-col h-full bg-black">
          <h2 className="text-white text-lg">Continue with -</h2>
          <GoogleSignInButton />
        </div>
      )}
    </div>
  );
}
