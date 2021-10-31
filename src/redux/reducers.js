import * as actions from './actions'
import { DataStatus } from './dataStatus'

const index = (data, alerted = false) => {
  const ret = {}
  data.forEach((pr) => {
    if (!alerted || isAlerted(pr)) ret[pr.id] = pr
  })
  return ret
}
const isAlerted = (data) => {
  return data.expirationAlert || data.stockAlert
}

export const products = (state = DataStatus.Loading, { type, data }) => {
  switch (type) {
    case actions.SET_PRODUCT:
      return { ...(state || {}), [data.id]: data }
    case actions.SET_PRODUCTS:
      if (data === []) return DataStatus.Loaded
      return index(data)
    case actions.DELETE_PRODUCT:
      return state.filter((item) => item.id !== data)
    default:
      return state
  }
}
export const alertedProducts = (state = DataStatus.Loading, { type, data }) => {
  switch (type) {
    case actions.SET_PRODUCT:
      if (isAlerted(data)) return { ...(state || {}), [data.id]: data }
      else if (state && state[data.id]) return { ...state, [data.id]: null }
      return state
    case actions.SET_PRODUCTS:
      if (data === []) return DataStatus.Loaded
      return index(data, true)
    case actions.DELETE_PRODUCT:
      return state.filter((item) => item.id !== data)
    default:
      return state
  }
}
