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

export default TimeBoundary;
