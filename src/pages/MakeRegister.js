import { LeftOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { StepsForm } from '../components/organisms/StepsForm'
import { ProductStockForm } from '../components/organisms/makeRegister/ProductStockForm'
import { ProductConfigForm } from '../components/organisms/makeRegister/ProductConfigForm'
import { addProduct } from '../redux/actionCreators'
import { useDispatch } from 'react-redux'

export const MakeRegister = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit = (data) => {
    console.log('Añadir producto', data)
    dispatch(addProduct({ ...data, code: match.params.code }))
    history.push('/')
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
        <h2 className="align-center margin-b-2">Code: {match.params.code}</h2>
        <StepsForm
          steps={[ProductStockForm, ProductConfigForm]}
          onSubmit={onSubmit}
        />
      </div>
    </main>
  )
}
