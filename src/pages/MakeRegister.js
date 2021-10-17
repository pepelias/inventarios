import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { StepsForm } from '../components/organisms/StepsForm'
import { ProductStockForm } from '../components/organisms/makeRegister/ProductStockForm'
import { ProductConfigForm } from '../components/organisms/makeRegister/ProductConfigForm'
import { addProduct, editProduct } from '../redux/actionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { calcExpirationDate } from '../helpers/calcExpiration'
import {
  ProductExpirationForm,
  ProductExpirationFormHandler,
} from '../components/organisms/makeRegister/ProductExpirationForm'
import { DataStatus } from '../redux/dataStatus'
import { Loading } from '../components/molecules/Loading'
import LoadingModal from '../components/molecules/LoadingModal'
import { useState } from 'react'

export const MakeRegister = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const editing = useSelector(({ products }) => {
    if(products === DataStatus.Loading) return DataStatus.Loading
    return products[match.params.code]
  })
  const [loading, setLoading] = useState()
  if(editing === DataStatus.Loading) return <Loading/>

  const onSubmit = async (data) => {
    data = {
      ...data,
      low_stock_alert: parseInt(data.low_stock_alert),
      expiration_alert_date: calcExpirationDate(
        data.expiration,
        data.expiration_time_alert
      ),
      code: editing?.code||match.params.code,
    }
    console.log('Submit', data)
    setLoading(true)
    try {
      await dispatch(editing?editProduct({ ...data, id: editing.id }):addProduct(data))
      setLoading(false)
      history.push('/')
    } catch (err) {
      setLoading(false)
      console.error(err)
      //  TODO: Mostrar error en el DOM
    }
  }

  return (
    <main className="make-register modal-page">
      <header className="modal-page__header">
        <Link to="/">
          <LeftOutlined />
        </Link>
        <h1>Añadir nuevo producto</h1>
      </header>
      <div className="modal-page__content">
        <h2 className="align-center margin-b-2">
          Code: {editing?.code || match.params.code}
        </h2>
        <StepsForm
          steps={{ ProductStockForm, ProductExpirationForm, ProductConfigForm }}
          handlers={{ ProductExpirationForm: ProductExpirationFormHandler }}
          order={[
            'ProductStockForm',
            'ProductExpirationForm',
            'ProductConfigForm',
          ]}
          onSubmit={onSubmit}
          initialData={editing}
        />
      </div>
      {loading && <LoadingModal>Enviando información</LoadingModal>}
    </main>
  )
}
