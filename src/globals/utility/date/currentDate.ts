export const currentDate = (): string => {
  const timestamp = Date.now();
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // short = Jan, Feb, etc.
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
