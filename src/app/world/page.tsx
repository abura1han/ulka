import UlkaCalendar from "@/components/calendar";

export default async function page() {
  return (
    <div>
      <div className="max-w-[1000px] mx-auto">
        <UlkaCalendar  containerClassName=""/>
      </div>
    </div>
  );
}
