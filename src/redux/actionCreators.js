import * as actions from './actions'

export const addProduct = (product) => ({
  type: actions.ADD_PRODUCT,
  data: product,
})
