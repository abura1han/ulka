import moment from "moment";

export const DATE_FORMAT = "D/M/YYYY";

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
  currentMonth: number,
  dateFormat: string = "D"
): DayInfo[] {
  const days: DayInfo[] = [];
  const startDate = moment(`${currentYear}-${currentMonth}-01`);
  const endDate = startDate.clone().endOf("month");

  // Add days of the previous month if the month does not start on Sunday
  const startDayOfWeek = startDate.day();
  for (let i = startDayOfWeek; i > 0; i--) {
    const prevDate = startDate.clone().subtract(i, "day");
    days.push({
      date: prevDate.format(dateFormat),
      dayName: prevDate.format("dddd"),
      active: false,
    });
  }

  // Add all days of the current month
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate, "day")) {
    const dayInfo: DayInfo = {
      date: currentDate.format(dateFormat),
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
      date: nextDate.format(dateFormat),
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

export function getCurrentWeek(
  year: number,
  month: number,
  date: number
): DayInfo[] {
  const days: DayInfo[] = [];
  const currentDate = moment(`${year}-${month}-${date}`);

  // Find the start of the week (Sunday)
  const startOfWeek = currentDate.clone().startOf("week");

  // Collect all days of the current week
  for (let i = 0; i < 7; i++) {
    const weekDate = startOfWeek.clone().add(i, "day");
    days.push({
      date: weekDate.format(DATE_FORMAT),
      dayName: weekDate.format("dddd"),
      active: true,
    });
  }

  return days;
}

export function getTimesWithAmPm(timeGap: number = 1): string[] {
  const times: string[] = [];
  let currentTime = moment("12:00 AM", "hh:mm A");

  while (currentTime.format("hh:mm A") !== "12:00 AM" || times.length === 0) {
    times.push(currentTime.format("hh:mm A"));
    currentTime.add(timeGap, "hours");
  }

  return times;
}

export const checkIsToday = (date: string) => {
  return date === moment().format(DATE_FORMAT);
};
