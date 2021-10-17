import {
  CalendarOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getTimeAgo } from '../../helpers/getTimeAgo'

export const Item = ({
  name,
  quantity,
  unit,
  expiration,
  expirationAlert,
  stockAlert,
  id,
}) => {
  let clss = ''
  let AlertIcon = CheckCircleOutlined

  // Alerta de vencimiento
  if (expirationAlert) {
    clss = expirationAlert
    AlertIcon = CalendarOutlined
  }
  // Alertar Stock
  if (stockAlert) {
    clss = stockAlert
    AlertIcon = ShoppingCartOutlined
  }

  // DobleAlerta
  if (expirationAlert && stockAlert) {
    clss =
      expirationAlert === 'error' || stockAlert === 'error'
        ? 'error'
        : 'warning'
    AlertIcon = WarningOutlined
  }

  return (
    <Link to={`/make/${id}`} className="product-item">
      <div className={`product-item__cover ${clss}`}>
        <AlertIcon />
      </div>
      <div className="product-item__data">
        <h1>{name}</h1>
        <p>
          <span className={stockAlert || ''}>
            Stock: {quantity}
            {unit}
          </span>
          <span className={expirationAlert || ''}>
            Vence: {getTimeAgo(expiration)}
          </span>
        </p>
      </div>
    </Link>
  )
}
