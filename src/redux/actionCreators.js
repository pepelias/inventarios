import { calcProductAlerts } from '../helpers/calcProductAlerts'
import { createProduct, getProducts, updateProduct } from '../services/products'
import * as actions from './actions'

export const addProduct = (product) => async (dispatch) => {
  const response = await createProduct(product)
  dispatch({
    type: actions.SET_PRODUCT,
    data: calcProductAlerts(response),
  })
}

export const editProduct = (product) => async (dispatch) => {
  const {stockAlert, expirationAlert, concatCode, ...save} = product
  const response = await updateProduct(save)
  dispatch({
    type: actions.SET_PRODUCT,
    data: calcProductAlerts(response)
  })
}

export const loadProducts = () => async (dispatch) => {
  const documents = await getProducts()
  dispatch({
    type: actions.SET_PRODUCTS,
    data: documents.map(product => calcProductAlerts(product))
  })
}