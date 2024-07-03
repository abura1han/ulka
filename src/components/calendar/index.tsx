"use client";

import { CalendarData } from "@/app/types/calendar";
import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { unpack } from "msgpackr";
import CalDayView from "./CalDayView";

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
      className={cn("", containerClassName)}
      style={{ ...springs }}
    >
      <CalDayView onClick={handleClick} calendarData={calendarData} />
    </animated.div>
  );
};

export default UlkaCalendar;
