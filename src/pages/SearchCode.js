import { Link, useHistory } from 'react-router-dom'
import {
  DeleteOutlined,
  EditOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'
import { removeProduct } from '../redux/actionCreators'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Loading } from '../components/molecules/Loading'

const SearchCode = ({ name, code, lotes, id }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const deleteProduct = async () => {
    const question =
      '¿Desea realmente eliminar este producto? (esto no puede deshacerse)'
    if (!confirm(question)) return false
    setLoading(true)
    try {
      await dispatch(removeProduct(id))
      history.push('/')
    } catch (err) {
      console.error(err)
      alert('Esta acción falló')
    }
    setLoading(false)
  }
  if (loading) return <Loading />
  return (
    <div className="modal">
      <div className="modal__container">
        <h1 className="subtitle align-center margin-b">
          ¿Qué haremos con {name}?
        </h1>
        <ul className="menu">
          <li className="menu__item">
            <Link to={`/concat-code/${code}/${code}`}>
              <PlusSquareOutlined /> Añadir Stock
            </Link>
          </li>
          {lotes.length > 0 && (
            <li className="menu__item">
              <Link to={`/decrement/${code}/${code}`}>
                <MinusSquareOutlined /> Restar Stock
              </Link>
            </li>
          )}
          <li className="menu__item">
            <Link to={`/editor/${code}?direct=true`}>
              <EditOutlined /> Editar producto
            </Link>
          </li>
          <li className="menu__item">
            <span className="menu__option" onClick={deleteProduct}>
              <DeleteOutlined /> Eliminar producto
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SearchCode
