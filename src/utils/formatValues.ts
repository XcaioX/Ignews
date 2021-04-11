export const formatPrice = (
  price: number,
  format: string,
  currency: string
): string => {
  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency
  }).format(price)
}
