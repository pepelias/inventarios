import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'

export const Inventory = () => {
  const products = useSelector(({ products }) => products)
  const elements = Object.entries(products)
  const printElement = ([i, product]) =>
    product ? (
      <li key={i}>
        <Item {...product} />
      </li>
    ) : null
  return <ul className="products-list">{elements.map(printElement)}</ul>
}
