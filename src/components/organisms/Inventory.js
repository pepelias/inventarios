import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'
import { DataStatus } from '../../redux/dataStatus'
import { Loading } from '../molecules/Loading'

export const Inventory = () => {
  const products = useSelector(({ products }) => products)

  if(products === DataStatus.Loading) return <Loading />

  const elements = Object.entries(products)
  const printElement = ([id, product]) => (
    <li key={id}>
      <Item {...product} />
    </li>
  )
  return <ul className="products-list">{elements.map(printElement)}</ul>
}
