import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";

const WorldViewLeftSidebar = () => {
  return (
    <div className="w-52 bg-gray-50 px-2 relative">
      <Tabs
        defaultValue="people"
        className="w-full max-h-full py-4 overflow-auto"
      >
        <TabsList className="w-full bg-gray-200 sticky top-0 z-10">
          <TabsTrigger className="w-full" value="people">
            People
          </TabsTrigger>
          <TabsTrigger className="w-full" value="tags">
            Tags
          </TabsTrigger>
        </TabsList>
        <TabsContent value="people" className="">
          <UserList />
        </TabsContent>
        <TabsContent value="tags">
          <TagList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorldViewLeftSidebar;

const UserList = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {Array(100)
        .fill(1)
        .map((item, index) => (
          <button
            key={item + index}
            className="w-full px-1 py-1 flex items-center justify-between gap-2 hover:bg-gray-300 rounded"
          >
            <Avatar className="size-6">
              <AvatarFallback className="text-xs font-medium">
                Ur
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-xs text-left">User {index}</div>
          </button>
        ))}
    </div>
  );
};

const TagList = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {Array(100)
        .fill(1)
        .map((item, index) => (
          <button
            key={item + index}
            className="w-full px-1 py-1 flex items-center justify-between gap-2 hover:bg-gray-300 rounded"
          >
            <Avatar className="size-6">
              <AvatarFallback className="text-xs font-medium">
                #
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-xs text-left">Tag {index}</div>
          </button>
        ))}
    </div>
  );
};

