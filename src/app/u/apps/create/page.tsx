import AppForm from "@/components/AppForm";
import { auth } from "@clerk/nextjs/server";

import Header from "@/components/dashboard/Header";

export default async function Page() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  return (
    <div>
      <Header />
      <AppForm operationMode="create"/>
    </div>
  );
}
