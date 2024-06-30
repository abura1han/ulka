import UlkaCalendar from "@/components/calendar";
import { calendarData } from "@/data";
import { encode } from "msgpackr";

export default async function page() {
  const serializedAsBuffer = encode(calendarData);

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
