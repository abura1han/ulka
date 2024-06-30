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
    <div className="flex h-[92vh]">
      {/* Calendar view */}
      <div className="flex-1 grid grid-cols-1 text-sm text-blue-800 font-medium text-center max-h-full overflow-auto">
        {today && (
          <div className="flex flex-col">
            <div
              className={cn(
                "flex flex-1 flex-col justify-start mt-2 border-r relative",
                "border-l"
              )}
            >
              {/* Time slots in day loop */}
              <div className="flex-1 hover:bg-gray-0 text-xs flex flex-col justify-between gap-6">
                {Object.keys(filteredCalData).map((time, index) => {
                  const items = filteredCalData[time];

                  return (
                    <div
                      key={time + index}
                      className="w-full h-full flex relative hover:bg-indigo-50 min-h-[500px] overflow-auto"
                    >
                      <TimeBoundary time={time} eventCount={items.length} />

                      {/* Time indicator */}
                      {checkIsToday(today.date) && (
                        <CalTimeIndicator
                          slotTime={time}
                          className="w-[98%] left-5 bg-green-800 before:bg-green-800"
                        />
                      )}

                      {/* Slot data */}
                      {items.map((i, index) => (
                        <div
                          key={i.id + index}
                          data-event-id={i.id}
                          className={cn(
                            "absolute left-32 min-h-20 border-2 p-2 rounded-md bg-white shadow",
                            search.get("event") === i.id && "border-blue-800"
                          )}
                          style={{
                            width: eventSlotWidth,
                            top: `${
                              i.startsAt[1].split(":")[1].split(" ")[0]
                            }%`,
                            left: eventSlotWidth * (index + 1) + 10 * index,
                          }}
                          onClick={() => {
                            router.push(`?event=${i.id}`);
                          }}
                        >
                          <div className="flex gap-2">
                            <div className="size-[50px] relative rounded-full overflow-hidden">
                              <Image
                                src={i.logo}
                                width={50}
                                height={50}
                                alt="User avatar"
                                className="object-cover"
                              />
                            </div>
                            <div className="text-left text-gray-900">
                              {i.title}
                            </div>
                          </div>
                          <div className="w-full text-left mt-4 flex items-center gap-1 text-gray-600">
                            <TimerIcon size={16} />
                            <div>{i.startsAt[1]}</div>
                            <div>-</div>
                            <div>{i.endsAt[1]}</div>
                          </div>
                          <div className="w-full text-left mt-3 text-gray-700">
                            {i.description}
                          </div>
                          <div className="w-full text-left mt-3 relative flex justify-between text-gray-600">
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
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
                <div
                  key={"last-slot"}
                  className="w-full flex justify-center"
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalDayView;
