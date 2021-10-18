import useProduct from '../hooks/useProduct'
import { Loading } from '../components/molecules/Loading'
import { DataStatus } from '../redux/dataStatus'
import { Link, useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { StepsForm } from '../components/organisms/StepsForm'
import {
  ProductExpirationForm,
  ProductExpirationFormHandler
} from '../components/organisms/makeRegister/ProductExpirationForm'
import { useDispatch } from 'react-redux'
import { editProduct } from '../redux/actionCreators'
import { useState } from 'react'
import LoadingModal from '../components/molecules/LoadingModal'

const CocatCode = ({match}) => {
  const concatCode = match.params.code
  const product = useProduct(match.params.id)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  if(product === DataStatus.Loading) return <Loading>Cargando...</Loading>

  const onSubmit = (product) => {
    setLoading(true)
    console.log(product)
    dispatch(editProduct(product))
      .then(() => history.push('/'))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  return <>
    <main className="make-register modal-page">
      <header className="modal-page__header">
        <Link to="/">
          <LeftOutlined />
        </Link>
        <h1>Editando {product.name}:</h1>
      </header>
      <div className='modal-page__content'>
        <StepsForm
          steps={{ ProductExpirationForm }}
          initialData={{ ...product, codes: [...product.codes,concatCode], concatCode }}
          handlers={{
            ProductExpirationForm: ProductExpirationFormHandler
          }}
          onSubmit={onSubmit}
        />
      </div>
    </main>
    {loading && <LoadingModal>Actualizando producto</LoadingModal>}
  </>
}
export default CocatCode