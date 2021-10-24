import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { StepsForm } from '../components/organisms/StepsForm'
import { ProductSelector } from '../components/organisms/makeRegister/ProductSelector'
import { ProductConfigForm } from '../components/organisms/makeRegister/ProductConfigForm'
import { addProduct, editProduct } from '../redux/actionCreators'
import { useDispatch } from 'react-redux'
import { calcExpirationDate } from '../helpers/calcExpiration'
import {
  ProductExpirationForm,
  ProductExpirationFormHandler,
} from '../components/organisms/makeRegister/ProductExpirationForm'
import { DataStatus } from '../redux/dataStatus'
import { Loading } from '../components/molecules/Loading'
import LoadingModal from '../components/molecules/LoadingModal'
import { useState } from 'react'
import useProduct from '../hooks/useProduct'
import SearchCode from './SearchCode'

const MakeProduct = ({ match }) => {
  const URI = new URL(location.href)
  const dispatch = useDispatch()
  const history = useHistory()
  const editing = useProduct(match.params.id)
  const [loading, setLoading] = useState()
  const showMenu = !URI.searchParams.get('direct')

  if (editing === DataStatus.Loading) return <Loading />

  const code = editing?.code || match.params.id
  const onSubmit = async (data) => {
    data = {
      ...data,
      low_stock_alert: parseInt(data.low_stock_alert),
      expiration_alert_date: calcExpirationDate(
        data.expiration,
        data.expiration_time_alert
      ),
      code,
    }
    setLoading(true)
    try {
      await dispatch(
        editing ? editProduct({ ...data, id: editing.id }) : addProduct(data)
      )
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
        <h1>Editor de producto</h1>
      </header>
      <div className="modal-page__content">
        <h2 className="align-center margin-b-2">Code: {code}</h2>
        <StepsForm
          steps={{ ProductSelector, ProductExpirationForm, ProductConfigForm }}
          handlers={{ ProductExpirationForm: ProductExpirationFormHandler }}
          order={[
            'ProductSelector',
            'ProductExpirationForm',
            'ProductConfigForm',
          ]}
          onSubmit={onSubmit}
          initialData={{
            ...editing,
            codes: editing && editing.codes ? editing.codes : [code],
            code,
          }}
        />
      </div>
      {loading && <LoadingModal>Enviando información</LoadingModal>}
      {showMenu && editing && <SearchCode {...editing} />}
    </main>
  )
}
export default MakeProduct
