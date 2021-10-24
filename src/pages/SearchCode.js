import useProduct from '../hooks/useProduct'
import { DataStatus } from '../redux/dataStatus'
import { Loading } from '../components/molecules/Loading'
import { Link, useHistory } from 'react-router-dom'
import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'

const SearchCode = ({ match }) => {
  const selected = useProduct(match.params.code)
  const history = useHistory()
  const code = match.params.code
  if (selected === DataStatus.Loading) return <Loading />
  if (!selected) history.push(`/editor/${code}`)
  return (
    <div className="modal">
      <div className="modal__container">
        <h1 className="subtitle align-center margin-b">
          ¿Qué haremos con {selected.name}?
        </h1>
        <ul className="menu">
          <li className="menu__item">
            <Link to={`/concat-code/${code}/${code}`}>
              <PlusSquareOutlined /> Añadir Stock
            </Link>
          </li>
          <li className="menu__item">
            <Link to={`/decrement/${code}/${code}`}>
              <MinusSquareOutlined /> Restar Stock
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SearchCode
