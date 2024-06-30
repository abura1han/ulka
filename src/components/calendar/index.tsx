"use client";

import { CalendarData } from "@/app/types/calendar";
import { cn } from "@/lib/utils";
import {
  DayInfo,
  checkIsToday,
  getCurrentWeek,
  getDaysByYearAndMonth,
  getMonths,
  getTimesWithAmPm,
  getWeekDayNames,
} from "@/utils/calendar";
import { animated, useSpring } from "@react-spring/web";
import { Loader2, TimerIcon } from "lucide-react";
import moment from "moment";
import { unpack } from "msgpackr";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";

const UlkaCalendar = ({
  containerClassName,
  calData,
}: {
  containerClassName: string;
  calData: any;
}) => {
  const uint8Array = new Uint8Array(calData.data);

  const calendarData = unpack(uint8Array) as CalendarData[];

  // Calendar views
  const [calViews, setCalViews] = useState<"day" | "week" | "month" | "year">(
    "day"
  );

  const [springs, api] = useSpring(() => ({
    from: {
      x: 0,
      y: 0,
      backgroundColor: "#fff",
      scale: 1,
      config: {
        precision: 0.0001,
      },
    },
  }));

  const handleClick = async () => {
    setCalViews((ps) => {
      if (ps === "year") return "month";
      if (ps === "month") return "week";

      return "day";
    });

    await api.start({
      from: {
        scale: 1,
      },
      to: {
        scale: 1.2,
      },
    });

    setTimeout(() => {
      api.start({
        to: { scale: 1 },
      });
    }, 100);
  };

  return (
    <animated.div
      className={cn("p-4", containerClassName)}
      style={{ ...springs }}
    >
      {calViews === "year" && <CalYearView onClick={handleClick} />}
      {calViews === "month" && <CalMonthView onClick={handleClick} />}
      {calViews === "week" && <CalWeekView onClick={handleClick} />}
      {calViews === "day" && (
        <CalDayView onClick={handleClick} calendarData={calendarData} />
      )}
    </animated.div>
  );
};

export default UlkaCalendar;

const MonthBlockInYearView = ({
  name,
  month,
  onClick,
}: {
  name: string;
  month: number;
  onClick: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<DayInfo[]>();
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  const weekDays = getWeekDayNames();

  /**
   * Get a list of days of the month
   */
  useEffect(() => {
    const currentYear = moment().year();
    setDays(getDaysByYearAndMonth(currentYear, month));
    setLoading(false);

    setCurrentMonth(moment().month() + 1);
  }, [month]);

  return (
    <div
      className={cn(
        "hover:bg-gray-100/50 border-2 border-transparent hover:border-slate-500 px-3 py-4 rounded select-none cursor-pointer",
        currentMonth === month && "border-indigo-200"
      )}
      onClick={onClick}
    >
      <div className="text-slate-500 text-sm font-medium">{name}</div>
      <div className="mt-4">
        <div className="grid grid-cols-7 text-sm text-blue-800 font-medium">
          {weekDays?.map((day, index) => (
            <div key={day + index}>{day.slice(0, 2)}</div>
          ))}
        </div>
        {loading ? (
          <div className="h-[170px] flex items-center justify-center">
            <Loader2 className="animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {days?.map((day, index) => (
              <div
                key={day.date + index}
                className={cn(
                  `${day.active ? "text-black" : "text-gray-400"}`,
                  "mt-2 text-sm"
                )}
              >
                {day.date}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CalYearView = ({ onClick }: { onClick: () => void }) => {
  const months = getMonths();

  return (
    <div className={cn("grid grid-cols-3 gap-4 ")}>
      {months.map((month, index) => (
        <MonthBlockInYearView
          key={month}
          name={month}
          month={index + 1}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

const CalMonthView = ({ onClick }: { onClick: () => void }) => {
  const currentMonth = moment().month() + 1;
  const months = getMonths()[currentMonth];

  return (
    <DayBlockInMonthView name={months} month={currentMonth} onClick={onClick} />
  );
};

const CalWeekView = ({ onClick }: { onClick: () => void }) => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1; // moment().month() returns 0-based month index
  const currentDate = moment().date();
  const currentWeek = getCurrentWeek(currentYear, currentMonth, currentDate);
  const times = getTimesWithAmPm();

  return (
    <div className="flex h-[90vh]">
      <div className="mt-[74px] text-xs mr-2 flex flex-col justify-between">
        {/* Time rows */}
        {times.map((time) => (
          <div key={time} className="">
            {time}
          </div>
        ))}
        <div key={"last-item"}></div>
      </div>
      {/* Calendar view */}
      <div className="flex-1 grid grid-cols-7 text-sm text-blue-800 font-medium text-center">
        {currentWeek?.map((day, index) => (
          <div key={day.date + day.dayName} className="flex flex-col">
            {/* Day name in week loop */}
            <div>{day.dayName.slice(0, 3)}</div>
            <div
              className={cn(
                "flex flex-1 flex-col justify-start mt-2 border-r relative",
                index === 0 && "border-l"
              )}
            >
              {/* Date in week loop */}
              <div className="border-b w-full h-max flex justify-center pb-3">
                <span
                  className={cn(
                    "size-8 rounded-full bg-gray-100 flex items-center justify-center",
                    checkIsToday(day.date) && "bg-blue-200 font-bold"
                  )}
                >
                  {day.date.split("-").at(-1)}
                </span>
              </div>

              {/* Time slots in day loop */}
              <div className="flex-1 hover:bg-gray-50 text-xs flex flex-col justify-between">
                {times.map((time) => (
                  <div
                    key={time}
                    className="w-full h-full flex justify-center relative border-b hover:bg-indigo-50"
                    onClick={onClick}
                  >
                    {/* Time indicator */}
                    {checkIsToday(day.date) && (
                      <CalTimeIndicator slotTime={time} />
                    )}
                  </div>
                ))}
                <div
                  key={"last-slot"}
                  className="w-full flex justify-center"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CalDayView = ({
  onClick,
  calendarData,
}: {
  onClick: () => void;
  calendarData: CalendarData[];
}) => {
  const router = useRouter();
  const search = useSearchParams();

  const currentYear = moment().year();
  const currentMonth = moment().month() + 1; // moment().month() returns 0-based month index
  const currentDate = moment().date();
  const currentWeek = getCurrentWeek(currentYear, currentMonth, currentDate);
  const times = getTimesWithAmPm();
  const eventSlotWidth = 260;

  const today = useMemo(() => {
    return currentWeek.filter((day) => checkIsToday(day.date));
  }, [currentWeek]);

  const data = useMemo(() => {
    // if (!today.length) return [];

    const filterData = calendarData.filter((cal) => {
      if (cal.startsAt[0] !== today[0].date) return false;

      return true;
    });

    const result = {} as Record<string, CalendarData[]>;

    // Group results by hour
    times.forEach((hour) => {
      result[hour] = filterData.filter((cal) => {
        const [calHour, calMinuteWithMeridium] = cal.startsAt[1].split(":");
        const [timeHour, timeMinuteWithMeridium] = hour.split(":");
        const [calMinute, calMaridium] = calMinuteWithMeridium.split(" ");
        const [timeMinute, timeMaridium] = timeMinuteWithMeridium.split(" ");

        if (calHour === timeHour && calMaridium === timeMaridium) return true;

        return false;
      });
    });

    return result;
  }, [calendarData, times, today]);

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
        {today?.map((day, index) => (
          <div key={day.date + day.dayName} className="flex flex-col">
            {/* Day name in week loop */}
            <div>{day.dayName.slice(0, 3)}</div>
            <div
              className={cn(
                "flex flex-1 flex-col justify-start mt-2 border-r relative",
                index === 0 && "border-l"
              )}
            >
              {/* Date in week loop */}
              <div className="border-b w-full h-max flex justify-center pb-3">
                <span
                  className={cn(
                    "size-8 rounded-full bg-gray-100 flex items-center justify-center",
                    checkIsToday(day.date) && "bg-blue-200 font-bold"
                  )}
                >
                  {day.date.split("-").at(-1)}
                </span>
              </div>

              {/* Time slots in day loop */}
              <div className="flex-1 hover:bg-gray-0 text-xs flex flex-col justify-between gap-6">
                {Object.keys(data).map((time) => {
                  const items = data[time];

                  return (
                    <div
                      key={time}
                      className="w-full h-full flex relative hover:bg-indigo-50 min-h-[500px] overflow-auto"
                    >
                      <TimeBoundary time={time} eventCount={items.length} />

                      {/* Time indicator */}
                      {checkIsToday(day.date) && (
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
        ))}
      </div>
    </div>
  );
};

const TimeBoundary = ({
  time,
  eventCount,
}: {
  time: string;
  eventCount: number;
}) => {
  return (
    <>
      <div className="sticky top-0 left-1 h-[calc(100%-5px)] w-[2px] bg-blue-200 before:absolute before:left-2/4 before:top-0 before:-translate-x-2/4 before:size-2 before:rounded-full before:bg-blue-800 rounded-bl-md">
        <div className="absolute left-4 w-max text-left z-50 bg-white px-2 py-1">
          <div className="text-sm">{time}</div>
          <div className="text-xs">{eventCount} events</div>
        </div>
      </div>
      <div className="sticky top-[calc(100%-5px)] left-1 w-[80%] h-[2px] bg-blue-200 before:absolute before:right-[-4px] before:top-2/4 before:-translate-y-2/4 before:size-2 before:rounded-full before:bg-blue-800 rounded-bl-md"></div>
    </>
  );
};

const DayBlockInMonthView = ({
  name,
  month,
  onClick,
}: {
  name: string;
  month: number;
  onClick: () => void;
}) => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;
  const today = moment().format("D/MM/YY");
  const weekDays = getWeekDayNames();
  const days = getDaysByYearAndMonth(currentYear, currentMonth, "D/MM/YY");

  return (
    <div>
      <div className="mt-4">
        <div className="grid grid-cols-7 text-sm text-blue-800 font-medium text-center">
          {weekDays?.map((day) => (
            <div key={day}>{day.slice(0, 2)}</div>
          ))}
        </div>
        {false ? (
          <div className="h-[170px] flex items-center justify-center">
            <Loader2 className="animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-7 mt-10 h-[84vh] justify-center text-center">
            {days?.map((day, index) => (
              <div
                key={day.date + index}
                className={cn(
                  `${day.active ? "text-black" : "text-gray-400"}`,
                  "mt-2 text-sm h-28 hover:bg-gray-100 w-full",
                  month === currentMonth &&
                    today === day.date &&
                    "bg-indigo-200"
                )}
                onClick={onClick}
              >
                {day.date.split("/").at(0)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CalTimeIndicator = ({
  slotTime,
  className,
}: {
  slotTime: string;
  className?: string;
}) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [position, setPosition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const calculatePos = () => {
      const currentTime = moment().format("hh A");
      const currentMinutes = moment().minutes();

      if (currentTime === slotTime) {
      }

      return { currentFormattedTime: currentTime, currentMinutes };
    };

    const timeInterval = setInterval(() => {
      const { currentMinutes, currentFormattedTime } = calculatePos();
      setPosition(currentMinutes);
      setShowIndicator(
        currentFormattedTime === slotTime.replace(slotTime.slice(2, 5), "")
      );
    }, 500);

    setLoading(false);

    return () => {
      clearInterval(timeInterval);
    };
  }, [slotTime]);

  if (!showIndicator) return null;
  if (loading) return null;

  return (
    <div
      className={cn(
        "w-full h-[2px] rounded bg-rose-500 absolute before:absolute before:size-3 before:-left-3 before:top-2/4 before:-translate-y-2/4 before:bg-rose-500 before:rounded-full",
        className
      )}
      style={{
        top: `${position}%`,
      }}
    ></div>
  );
};
