const numberToUah = (price: number): string =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
  }).format(price);

export default numberToUah;
