import { ClientOnly } from "@/components/ClientOnly";
import {
  CreateAppButton,
  CreateAppModal,
} from "@/components/dashboard/CreateAppModal";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

const appList = [
  { id: crypto.randomUUID(), name: "App name 1", domain: "app.app.app" },
  { id: crypto.randomUUID(), name: "App name 2", domain: "app.app.app" },
  { id: crypto.randomUUID(), name: "App name 3", domain: "app.app.app" },
  { id: crypto.randomUUID(), name: "App name 4", domain: "app.app.app" },
  { id: crypto.randomUUID(), name: "App name 5", domain: "app.app.app" },
];

export default function Page({}) {
  return (
    <div>
      <Header />
      {/* Modal */}
      <ClientOnly>
        <CreateAppModal />
      </ClientOnly>
      <div className="flex items-center justify-between container mx-auto px-4 mt-4">
        <h2>App list</h2>
        <CreateAppButton />
      </div>

      <div className="container mx-auto px-4 mt-4 space-">
        {appList.map((app) => (
          <Link
            key={app.id}
            href={`/u/apps/${app.id}`}
            className="block px-1 py-2 border-b hover:bg-primary hover:text-white"
          >
            <div>{app.name}</div>
            <div className="text-sm">{app.domain}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

