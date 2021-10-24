import { Link, useHistory } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import useProduct from '../hooks/useProduct'
import { DataStatus } from '../redux/dataStatus'
import { Loading } from '../components/molecules/Loading'
import { DiscounterLote } from '../components/organisms/DiscounterLote'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProduct } from '../redux/actionCreators'
import { ProductExpirationFormHandler } from '../components/organisms/makeRegister/ProductExpirationForm'

const Decrement = ({ match }) => {
  const product = useProduct(match.params.code)
  const dispatch = useDispatch()
  const [lotes, setLotes] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  useEffect(() => {
    if (!product) return false
    setLotes(product.lotes)
  }, [product])
  if (product === DataStatus.Loading || loading) return <Loading />

  const onChange = (lote) => {
    setLotes(lotes.map((lt) => (lt.id === lote.id ? lote : lt)))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await dispatch(
        editProduct(ProductExpirationFormHandler({ ...product, lotes }))
      )
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="modal-page">
      <header className="modal-page__header">
        <Link to="/">
          <LeftOutlined />
        </Link>
        <h1>Restar stock de: {product.name}</h1>
      </header>
      <form className="modal-page__content" onSubmit={onSubmit}>
        {product.lotes.map((lote) => (
          <DiscounterLote key={lote.id} {...lote} onChange={onChange} />
        ))}
        <button>Completar</button>
      </form>
    </div>
  )
}
export default Decrement
