const convertDollarsToCents = (amount: number) => {
  return Math.round(amount * 100);
};

const convertCentsToDollars = (cents) => {
  return (cents / 100).toFixed(2);
};
