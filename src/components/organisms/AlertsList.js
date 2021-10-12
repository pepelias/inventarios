import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'

export const AlertsList = () => {
  const alerts = useSelector(({ alertedProducts }) => alertedProducts)
  return (
    <ul>
      {alerts.map((product, i) => (
        <li key={i}>
          <Item {...product} />
        </li>
      ))}
    </ul>
  )
}
