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

export const formatDate = (date: string, format: string): string => {
  return new Date(date).toLocaleDateString(format, {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
