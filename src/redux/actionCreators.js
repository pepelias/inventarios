import { calcProductAlerts } from '../helpers/calcProductAlerts'
import * as actions from './actions'

export const addProduct = (product) => async (dispatch) => {
  product = calcProductAlerts(product)
  dispatch({
    type: actions.ADD_PRODUCT,
    data: product,
  })
}
