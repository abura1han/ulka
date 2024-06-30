import UlkaCalendar from "@/components/calendar";
import { calendarData } from "@/data";
import { DATE_FORMAT } from "@/utils/calendar";
import moment from "moment";
import { encode } from "msgpackr";

export default async function page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const filteredCalData = calendarData.filter((cal) => {
    const today = moment(
      searchParams.date || undefined,
      searchParams.date ? DATE_FORMAT : undefined
    ).format(DATE_FORMAT);
    if (cal.startsAt[0] === today) return true;
    if (cal.endsAt[0] === today) return true;

    return false;
  });

  const serializedAsBuffer = encode(filteredCalData);

  return (
    <div className="w-full">
      <div className="w-full">
        <UlkaCalendar
          containerClassName="w-full"
          calData={serializedAsBuffer}
        />
      </div>
    </div>
  );
}
