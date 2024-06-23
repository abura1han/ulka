import moment from "moment";

export function getMonths(): string[] {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months;
}

export interface DayInfo {
  date: string;
  dayName: string;
  active: boolean;
}

export function getDaysByYearAndMonth(
  currentYear: number,
  currentMonth: number
): DayInfo[] {
  const days: DayInfo[] = [];
  const startDate = moment(`${currentYear}-${currentMonth}-01`);
  const endDate = startDate.clone().endOf("month");

  // Add days of the previous month if the month does not start on Sunday
  const startDayOfWeek = startDate.day();
  for (let i = startDayOfWeek; i > 0; i--) {
    const prevDate = startDate.clone().subtract(i, "day");
    days.push({
      date: prevDate.format("D"),
      dayName: prevDate.format("dddd"),
      active: false,
    });
  }

  // Add all days of the current month
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate, "day")) {
    const dayInfo: DayInfo = {
      date: currentDate.format("D"),
      dayName: currentDate.format("dddd"),
      active: true,
    };
    days.push(dayInfo);
    currentDate.add(1, "day");
  }

  // Add days of the next month if the month does not end on Saturday
  const endDayOfWeek = endDate.day();
  for (let i = 1; i <= 6 - endDayOfWeek; i++) {
    const nextDate = endDate.clone().add(i, "day");
    days.push({
      date: nextDate.format("D"),
      dayName: nextDate.format("dddd"),
      active: false,
    });
  }

  return days;
}

export function getWeekDayNames(): string[] {
  const dayNames: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames;
}
