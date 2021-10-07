import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'

export const Inventory = () => {
  const products = useSelector(({ products }) => products)
  return (
    <ul>
      {products.map((product, i) => (
        <li key={i}>
          <Item {...product} />
        </li>
      ))}
    </ul>
  )
}
