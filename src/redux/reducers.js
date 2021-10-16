import * as actions from './actions'

export const products = (state = {}, { type, data }) => {
  // TODO: Cambar data.code por data.id (Una vez esté backend)
  switch (type) {
    case actions.ADD_PRODUCT:
      return { ...state, [data.code]: data }
    default:
      return state
  }
}
export const alertedProducts = (state = {}, { type, data }) => {
  switch (type) {
    case actions.ADD_PRODUCT:
      if (data.expirationAlert || data.stockAlert)
        return { ...state, [data.code]: data }
      else if (state[data.code]) return { ...state, [data.code]: null }
      return state
    default:
      return state
  }
}
