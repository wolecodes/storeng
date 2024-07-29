const displayCurrency = (curr) => {
  const format = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  return format.format(curr);
};

export default displayCurrency;
