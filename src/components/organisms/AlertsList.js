import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'
import { DataStatus } from '../../redux/dataStatus'
import { Loading } from '../molecules/Loading'

export const AlertsList = () => {
  const alerts = useSelector(({ alertedProducts }) => alertedProducts)

  if(alerts === DataStatus.Loading) return <Loading>Cargando...</Loading>

  const elements = Object.entries(alerts)
  const printElement = ([id, product]) => {
    return product ? (
      <li key={id}>
        <Item {...product} />
      </li>
    ) : null
  }
  return <ul className="products-list">{elements.map(printElement)}</ul>
}
