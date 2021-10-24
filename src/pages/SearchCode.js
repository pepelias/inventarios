import { Link } from 'react-router-dom'
import {
  EditOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'

const SearchCode = ({ name, code, lotes }) => {
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
        </ul>
      </div>
    </div>
  )
}
export default SearchCode
