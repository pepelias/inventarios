import * as actions from './actions'

export const products = (state = [], { type, data }) => {
  switch (type) {
    case actions.ADD_PRODUCT:
      return [...state, data]
    default:
      return state
  }
}
