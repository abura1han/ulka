import { eventCategories } from "@/data";
import { CheckIcon } from "lucide-react";
import StickyBox from "react-sticky-box";
import GoogleSignInButton from "./button/GoogleSignInButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const MainSidebar = () => {
  return (
    <aside className="col-span-2">
      <StickyBox offsetTop={100}>
        <h3 className="text-sm mt-4 text-center">Signup & unlock features</h3>
        <GoogleSignInButton containerClass="mt-1 bg-white w-full border rounded-lg h-11 justify-center text-sm" />

        <h3 className="text-sm mt-4">Search</h3>
        <Input placeholder="Search..." className="max-w-56" />

        <h3 className="text-sm mt-4">Sort by</h3>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Recent</TabsTrigger>
            <TabsTrigger value="Popular">Popular</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          </TabsList>
        </Tabs>

        <h3 className="text-sm mt-4">Categories</h3>
        <div className="text-sm gap-1 flex flex-wrap">
          {eventCategories.map((cat) => (
            <Button
              key={cat}
              size={"sm"}
              variant={"outline"}
              className="text-xs h-8"
            >
              <CheckIcon size={14} />
              {cat}
            </Button>
          ))}
        </div>
      </StickyBox>
    </aside>
  );
};

export default MainSidebar;
