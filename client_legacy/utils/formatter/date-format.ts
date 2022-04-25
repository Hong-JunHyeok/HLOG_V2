const dateFormatter = (date: string) => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return formattedDate;
};

export default dateFormatter;
