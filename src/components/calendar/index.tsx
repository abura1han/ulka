"use client";

import { cn } from "@/lib/utils";
import {
  DayInfo,
  getDaysByYearAndMonth,
  getMonths,
  getWeekDayNames,
} from "@/utils/calendar";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

const UlkaCalendar = () => {
  const months = getMonths();
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {months.map((month, index) => (
        <MonthBlockInYearView key={month} name={month} month={index + 1} />
      ))}
    </div>
  );
};

export default UlkaCalendar;

const MonthBlockInYearView = ({
  name,
  month,
}: {
  name: string;
  month: number;
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
    <div className="hover:bg-gray-100/50 border-2 border-transparent hover:border-slate-500 px-3 py-4 rounded select-none cursor-pointer">
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
