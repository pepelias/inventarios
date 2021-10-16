import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'

export const AlertsList = () => {
  const alerts = useSelector(({ alertedProducts }) => alertedProducts)
  const elements = Object.entries(alerts)
  const printElement = ([i, product]) => {
    return product ? (
      <li key={i}>
        <Item {...product} />
      </li>
    ) : null
  }
  return <ul className="products-list">{elements.map(printElement)}</ul>
}
