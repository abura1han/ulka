"use client";

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
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

const UlkaCalendar = ({
  containerClassName,
}: {
  containerClassName: string;
}) => {
  // Calendar views
  const [calViews, setCalViews] = useState<"day" | "week" | "month" | "year">(
    "year"
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
        scale: 1.5,
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
      {calViews === "day" && <CalDayView onClick={handleClick} />}
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

  const weekDays = getWeekDayNames();

  /**
   * Get a list of days of the month
   */
  useEffect(() => {
    const currentYear = moment().year();
    setDays(getDaysByYearAndMonth(currentYear, month));
    setLoading(false);
  }, [month]);

  return (
    <div
      className="hover:bg-gray-100/50 border-2 border-transparent hover:border-slate-500 px-3 py-4 rounded select-none cursor-pointer"
      onClick={onClick}
    >
      <div className="text-slate-500 text-sm font-medium">{name}</div>
      <div className="mt-4">
        <div className="grid grid-cols-7 text-sm text-blue-800 font-medium">
          {weekDays?.map((day) => (
            <div key={day}>{day.slice(0, 2)}</div>
          ))}
        </div>
        {loading ? (
          <div className="h-[170px] flex items-center justify-center">
            <Loader2 className="animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {days?.map((day) => (
              <div
                key={day.date}
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

const CalDayView = ({ onClick }: { onClick: () => void }) => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1; // moment().month() returns 0-based month index
  const currentDate = moment().date();
  const currentWeek = getCurrentWeek(currentYear, currentMonth, currentDate);
  const times = getTimesWithAmPm();

  const today = useMemo(() => {
    return currentWeek.filter((day) => checkIsToday(day.date));
  }, [currentWeek]);

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
      <div className="flex-1 grid grid-cols-1 text-sm text-blue-800 font-medium text-center">
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
              <div className="flex-1 hover:bg-gray-50 text-xs flex flex-col justify-between">
                {times.map((time) => (
                  <div
                    key={time}
                    className="w-full h-full flex justify-center relative border-b hover:bg-indigo-50"
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
  const weekDays = getWeekDayNames();
  const days = getDaysByYearAndMonth(currentYear, currentMonth);

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
            {days?.map((day) => (
              <div
                key={day.date}
                className={cn(
                  `${day.active ? "text-black" : "text-gray-400"}`,
                  "mt-2 text-sm h-28 hover:bg-gray-100 w-full"
                )}
                onClick={onClick}
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

const DayBlockInDayView = ({
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
  const weekDays = getWeekDayNames();
  const days = getDaysByYearAndMonth(currentYear, currentMonth);

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
            {days?.map((day) => (
              <div
                key={day.date}
                className={cn(
                  `${day.active ? "text-black" : "text-gray-400"}`,
                  "mt-2 text-sm h-28 hover:bg-gray-100 w-full"
                )}
                onClick={onClick}
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

const CalTimeIndicator = ({ slotTime }: { slotTime: string }) => {
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
      className="w-full h-[2px] rounded bg-rose-500 absolute before:absolute before:size-3 before:-left-3 before:top-2/4 before:-translate-y-2/4 before:bg-rose-500 before:rounded-full"
      style={{
        top: `${position}%`,
      }}
    ></div>
  );
};
