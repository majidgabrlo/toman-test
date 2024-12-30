export const convertDate = (date: string) => {
  const d = new Date(date);
  const formattedDate = d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return formattedDate;
};
