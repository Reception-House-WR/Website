export const formatCurrency = (amount: number, lang: string) => {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
};