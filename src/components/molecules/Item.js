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
  concatCode,
  disabled = false,
  code,
  lotes,
  disableExpiration = false
}) => {
  let clss = ''
  let AlertIcon = CheckCircleOutlined
  const exists = lotes.length > 0

  // Alerta de vencimiento
  if (exists && expirationAlert) {
    clss = expirationAlert
    AlertIcon = CalendarOutlined
  }
  // Alertar Stock
  if (exists && stockAlert) {
    clss = stockAlert
    AlertIcon = ShoppingCartOutlined
  }

  // DobleAlerta
  if (exists && expirationAlert && stockAlert) {
    clss =
      expirationAlert === 'error' || stockAlert === 'error'
        ? 'error'
        : 'warning'
    AlertIcon = WarningOutlined
  }

  let url = `/editor/${code}`
  if (concatCode) url = `/concat-code/${code}/${concatCode}`
  if (disabled) url = `#disabled`

  return (
    <Link to={disabled ? '#disabled' : url} className="product-item">
      <div className={`product-item__cover ${clss}`}>
        <AlertIcon />
      </div>
      <div className="product-item__data">
        <h1>{name}</h1>
        {exists && (
          <p>
            <span className={stockAlert || ''}>
              Stock: {quantity}
              {unit}
            </span>
            <span className={expirationAlert || ''}>
              {disableExpiration ? 'No expira' : `Vence: ${getTimeAgo(expiration)}`}
            </span>
          </p>
        )}
      </div>
    </Link>
  )
}
