const usdToNumber = (usdString: string): number => {
  const numberString = usdString.replace(/[^0-9.-]+/g, "");
  return parseFloat(numberString);
};

export default usdToNumber;
