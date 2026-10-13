function addMonths(date, months) {
  const result = new Date(date);
  const day = result.getUTCDate();

  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);

  const lastDay = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0),
  ).getUTCDate();

  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

export function calculateRevisionDates(startDate) {
  const start = new Date(`${startDate}T00:00:00Z`);

  const oneWeek = new Date(start);
  oneWeek.setUTCDate(oneWeek.getUTCDate() + 7);

  const dates = [
    oneWeek,
    addMonths(start, 1),
    addMonths(start, 3),
    addMonths(start, 6),
    addMonths(start, 12),
  ];

  return dates.map((date) => date.toISOString().slice(0, 10));
}

export function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}