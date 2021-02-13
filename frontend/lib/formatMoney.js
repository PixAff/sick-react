export default function formatMoney(cents = 0) {
  const options = {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  };
  const formatter = new Intl.NumberFormat("en-DE", options);

  return formatter.format(cents / 100);
}
