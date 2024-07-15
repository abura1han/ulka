import { cn } from "@/lib/utils";
import moment from "moment";
import { useEffect, useState } from "react";

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

export default CalTimeIndicator;
