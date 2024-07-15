import { CalendarData } from "@/app/types/calendar";
import { cn } from "@/lib/utils";
import {
  DATE_FORMAT,
  checkIsToday,
  getCurrentWeek,
  getTimesWithAmPm,
} from "@/utils/calendar";
import { TimerIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import CalTimeIndicator from "./CalTimeIndicator";
import TimeBoundary from "./TimeBoundary";
import Line from "./LineComp";

const CalDayView = ({
  onClick,
  calendarData,
}: {
  onClick: () => void;
  calendarData: CalendarData[];
}) => {
  const router = useRouter();
  const search = useSearchParams();
  const locationDate = search.get("date");

  const momentDate = moment(
    locationDate || undefined,
    locationDate ? DATE_FORMAT : undefined
  );

  const selectedDate = momentDate.format(DATE_FORMAT);

  const currentYear = momentDate.year();
  const currentMonth = momentDate.month() + 1; // moment().month() returns 0-based month index
  const currentDate = momentDate.date();
  const currentWeek = getCurrentWeek(currentYear, currentMonth, currentDate);
  const times = getTimesWithAmPm();
  const eventSlotWidth = 260;

  const today = useMemo(() => {
    return currentWeek.find((day) => checkIsToday(day.date));
  }, [currentWeek]);

  /**
   * Group calendar data
   */
  const filteredCalData = useMemo(() => {
    const filterData = calendarData.filter((cal) => {
      // if (cal.startsAt[0] !== today?.date) return false;
      if (cal.startsAt[0] === selectedDate) return true;
      if (cal.endsAt[0] === selectedDate) return true;

      return false;
    });

    const result = {} as Record<string, CalendarData[]>;

    // Group results by hour
    times.forEach((hour) => {
      result[hour] = filterData.filter((cal) => {
        const [calHour, calMinuteWithMeridiem] = cal.startsAt[1].split(":");
        const [timeHour, timeMinuteWithMeridiem] = hour.split(":");
        const [calMinute, calMeridiem] = calMinuteWithMeridiem.split(" ");
        const [timeMinute, timeMeridiem] = timeMinuteWithMeridiem.split(" ");

        if (calHour === timeHour && calMeridiem === timeMeridiem) return true;

        return false;
      });
    });

    return result;
  }, [calendarData, selectedDate, times]);

  useEffect(() => {
    const selectedEventId = search.get("event");
    if (!selectedEventId) return;

    const element = document.querySelector(
      `[data-event-id="${selectedEventId}"]`
    );

    element?.scrollIntoView({ behavior: "smooth" });
  }, [search]);

  return (
    <div>
      {/* <HoursRow /> */}

      <div className="sticky top-0 text-xs flex flex-row justify-between py-2 w-max border-b bg-white">
        {Object.keys(filteredCalData).map((hourlyData, index) => {
          const itemData = filteredCalData[hourlyData];

          return (
            <div
              key={hourlyData + index}
              className={cn(
                "border-l border-gray-100 hover:bg-blue-50 relative",
                itemData.length && "w-[300px]",
                itemData.length > 5 && "w-[420px]"
              )}
            >
              <div
                className={cn(
                  "min-w-[130px] font-bold mb-6 border-b border-gray-300 sticky top-0 left-0 z-50 bg-white",
                  !index && "pl-4"
                )}
              >
                {hourlyData} ({itemData.length} events)
              </div>

              {itemData.map((item, itemIndex) => {
                return (
                  <div
                    key={item.id + itemIndex}
                    data-event-id={item.id}
                    className={cn(
                      "absolute min-h-0 border-2 rounded-full bg-white group",
                      "size-[40px] mt-1 hover:border-black/70 z-10 relative"
                    )}
                    style={{
                      // width: eventSlotWidth,
                      // top: `${item.startsAt[1].split(":")[1].split(" ")[0]}%`,
                      // left: eventSlotWidth * (index + 1) + 10 * index,
                      marginLeft: `calc(${
                        item.startsAt[1].split(":")[1].split(" ")[0]
                      }%)`,
                    }}
                    onClick={() => {
                      router.push(`?event=${item.id}`);
                    }}
                  >
                    <div
                      className={cn(
                        "!size-[38px] relative rounded-full overflow-hidden",
                        search.get("event") === item.id && "border-blue-800"
                      )}
                    >
                      <Image
                        src={item.logo}
                        width={30}
                        height={30}
                        alt="User avatar"
                        className="object-cover size-[38px]"
                      />
                    </div>
                    <div
                      className={cn(
                        "text-sm font-medium text-left text-gray-900 absolute bottom-0  bg-white  group-hover:block w-[300px] px-3 py-2 rounded-sm shadow-lg",
                        itemIndex + 1 === itemData.length
                          ? "right-full"
                          : "left-full"
                      )}
                    >
                      {item.title}
                      <div className="w-full text-left mt-1 flex items-center gap-1 text-gray-600">
                        <TimerIcon size={16} />
                        <div>{item.startsAt[1]}</div>
                        <div>-</div>
                        <div>{item.endsAt[1]}</div>
                      </div>
                    </div>
                    {/* <div className="w-full text-left mt-4 flex items-center gap-1 text-gray-600">
                      <TimerIcon size={16} />
                      <div>{item.startsAt[1]}</div>
                      <div>-</div>
                      <div>{item.endsAt[1]}</div>
                    </div> */}

                    {/* <div className="w-full text-left mt-3 relative flex justify-between text-gray-600">
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className={cn("text-xs px-1 h-8")}
                      >
                        Hide
                      </Button>
                      <Button
                        size={"sm"}
                        variant={"outline"}
                        className={cn("text-xs px-1 h-8")}
                      >
                        Notify me
                      </Button>
                    </div> */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalDayView;

const HoursRow = () => {
  return (
    <div className="sticky top-0 text-xs flex flex-row justify-between py-2 w-max border-b bg-gray-50">
      {getTimesWithAmPm().map((time, index) => (
        <div
          key={time + index}
          className={cn("min-w-[130px] font-bold", !index && "pl-4")}
        >
          {time}
        </div>
      ))}
    </div>
  );
};
