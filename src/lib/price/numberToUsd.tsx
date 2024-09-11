const numberToUsd = (price: number): string =>
  new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default numberToUsd;
