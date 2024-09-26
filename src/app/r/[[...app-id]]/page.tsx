import RedirectPage from "@/components/redirect/RedirectPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting - Ulka",
  description: "Platform for developers by developers",
};

export default async function Page() {
  return (
    <div>
      <RedirectPage />
    </div>
  );
}
