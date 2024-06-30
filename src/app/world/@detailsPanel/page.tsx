import DetailsPanelHeader from "@/components/headers/DetailsPanelHeader";
import { Button } from "@/components/ui/button";
import { calendarData } from "@/data";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  if (!Object.keys(searchParams).length) {
    return <></>;
  }

  const data = calendarData.find((item) => item.id === searchParams.event);

  if (!data) {
    return <></>;
  }

  return (
    <div className="w-96 bg-white pt-3 pr-4">
      <DetailsPanelHeader />

      <div className="mt-3">
        <div className="font-bold text-blue-800">{data.title}</div>
      </div>

      <div className="mt-3">
        <Image
          src={data?.coverImage}
          width={370}
          height={200}
          alt="Cover"
          className="w-full rounded-lg shadow"
        />
      </div>

      <div className="mt-3">
        <div className="font-bold text-blue-800 text-sm">Time</div>
        <div className="font-medium text-blue-800 text-sm">
          Starts at {data.startsAt[1]} - {data.startsAt[0]}
        </div>
        <div className="font-medium text-blue-800 text-sm">
          Ends at {data.endsAt[1]} - {data.endsAt[0]}
        </div>
      </div>
      <div className="mt-3 text-blue-800">
        <h2 className="font-bold text-sm">Description</h2>
        <p className="text-sm mt-2">{data.description}</p>
      </div>

      <div className="mt-3">
        <div className="font-bold text-blue-800 text-sm mb-2">Creator</div>
        <div className="flex gap-2">
          <Image src={data.logo} width={50} height={50} alt="Avatar url" />
          <div className="text-sm">
            <Link
              href={"/"}
              className="font-medium text-blue-800 hover:underline block"
            >
              Abu Raihan
            </Link>
            <Link
              href={"/"}
              className="font-medium text-blue-800 text-xs hover:underline block"
            >
              @abu
            </Link>
            <div className="mt-2">
              <Button size={"sm"} className="text-xs px-1 py-0 h-8 bg-blue-800">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="font-bold text-blue-800 text-sm">Tags</div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {Array(6)
            .fill(1)
            .map((tag, index) => (
              <Link
                key={tag + index}
                href={"/"}
                className="text-xs rounded-md text-blue-800 p-0 underline font-medium"
              >
                #Topic some
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
