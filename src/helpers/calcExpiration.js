import { DATE_UNITS } from './getTimeAgo'
const day = DATE_UNITS.find(([unit]) => unit === 'day')[1] * 1000
const month = DATE_UNITS.find(([unit]) => unit === 'month')[1] * 1000

export const calcExpirationDate = (expiration, alertTime) => {
  if(expiration === 0) return 0
  let discount
  switch (alertTime) {
    case '15d':
      discount = day * 15
      break
    case '1.5m':
      discount = month * 1.5
      break
    case '2m':
      discount = month * 2
      break
    default:
      discount = month * 1
  }
  return new Date(expiration - discount).getTime()
}
