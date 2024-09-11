export const getCurrentDateTimeString: () => string = () => {
  // Получение текущей даты
  const currentDate = new Date();
  // Получение начала текущего месяца
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // Получение текущего дня
  const day = currentDate.getDate();

  const isoStringCurrentDay = `${year}-${month + 1 < 10 ? "0" : ""}${
    month + 1
  }-${day < 10 ? "0" : ""}${day}T${currentDate.toTimeString().slice(0, 8)}`;

  return isoStringCurrentDay;
};

export const getStartOfMonthDateTimeString: () => string = () => {
  // Получение текущей даты
  const currentDate = new Date();
  // Получение начала текущего месяца
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const startOfMonth = new Date(year, month, 1, 0, 0, 0); // Устанавливаем день на 1 и время в полночь

  // Корректировка времени в соответствии с временной зоной
  const timeOffsetInMinutes = startOfMonth.getTimezoneOffset();
  startOfMonth.setMinutes(startOfMonth.getMinutes() - timeOffsetInMinutes);

  // Преобразование начала месяца в строку в нужном формате
  const isoStringStartOfMonth = startOfMonth.toISOString().slice(0, 19);

  return isoStringStartOfMonth;
};
