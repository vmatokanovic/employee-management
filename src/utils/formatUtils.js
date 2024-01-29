const formatDate = (value) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const [month, day, year] = value
    .toLocaleDateString("en-US", options)
    .split("/");

  const formattedDate = `${day}.${month}.${year}.`;
  return formattedDate;
};

export { formatDate };
