import { DATE_UNITS } from './getTimeAgo'

export const calcExpirationDate = (expirationDate, alertTime) => {
  let discount, discounter
  switch (alertTime) {
    case '15d':
      discounter = DATE_UNITS.find(([unit]) => unit === 'day')
      discount = discounter[1] * 15 * 1000
      break
    case '1.5m':
      discounter = DATE_UNITS.find(([unit]) => unit === 'month')
      discount = discounter[1] * 1.5 * 1000
      break
    case '2m':
      discounter = DATE_UNITS.find(([unit]) => unit === 'month')
      discount = discounter[1] * 2 * 1000
      break
    default:
      discounter = DATE_UNITS.find(([unit]) => unit === 'month')
      discount = discounter[1] * 1 * 1000
  }
  const alertDate = new Date(expirationDate - discount)
  return alertDate.getTime()
}
