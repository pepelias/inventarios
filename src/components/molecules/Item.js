import {
  CalendarOutlined,
  CheckCircleOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { getTimeAgo } from '../../helpers/getTimeAgo'

export const Item = ({
  name,
  quantity,
  unit,
  expiration_date: expirationDate,
  expiration_alert_date: expirationAlertDay,
  low_stock_alert: lowStockAlert,
}) => {
  let clss = ''
  let AlertIcon = CheckCircleOutlined
  const difference = expirationAlertDay - Date.now()
  const expirationAlert = (() => {
    if (expirationDate <= Date.now()) return 'error'
    if (difference <= 0) return 'warning'
    return false
  })()
  const stockAlert = (() => {
    if (quantity <= 0) return 'error'
    if (parseInt(quantity) <= parseInt(lowStockAlert)) return 'warning'
    return false
  })()

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
    <div className="product-item">
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
            Vence: {getTimeAgo(expirationDate)}
          </span>
        </p>
      </div>
    </div>
  )
}
