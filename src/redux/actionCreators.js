import { calcProductAlerts } from '../helpers/calcProductAlerts'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../services/products'
import * as actions from './actions'
import { DELETE_PRODUCT } from './actions'

export const addProduct = (product) => async (dispatch) => {
  const response = await createProduct(product)
  dispatch({
    type: actions.SET_PRODUCT,
    data: calcProductAlerts(response),
  })
}

export const editProduct = (product) => async (dispatch) => {
  const { stockAlert, expirationAlert, concatCode, ...save } = product
  const response = await updateProduct(save)
  dispatch({
    type: actions.SET_PRODUCT,
    data: calcProductAlerts(response),
  })
}

export const loadProducts = () => async (dispatch) => {
  try {
    const documents = await getProducts()
    dispatch({
      type: actions.SET_PRODUCTS,
      data: documents.map((product) => calcProductAlerts(product)),
    })
  } catch(err) {
    console.error(err)
  }
}

export const removeProduct = (id) => async (dispatch) => {
  await deleteProduct(id)
  dispatch({ type: DELETE_PRODUCT, data: id })
}
