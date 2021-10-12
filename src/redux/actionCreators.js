import { calcProductAlerts } from '../helpers/calcProductAlerts'
import * as actions from './actions'

export const addProduct = (product) => async (dispatch) => {
  product = calcProductAlerts(product)
  if (product.expirationAlert || product.stockAlert)
    dispatch({
      type: actions.ADD_ALERTED_PRODUCT,
      data: product,
    })
  dispatch({
    type: actions.ADD_PRODUCT,
    data: product,
  })
}
