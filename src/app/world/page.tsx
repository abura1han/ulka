import UlkaCalendar from "@/components/calendar";

export default async function page() {
  return (
    <div className="w-full">
      <div className="w-full">
        <UlkaCalendar containerClassName="w-full" />
      </div>
    </div>
  );
}
