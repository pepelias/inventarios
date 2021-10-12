export const calcProductAlerts = (product) => {
  // Alerta de expiración
  product.expirationAlert = (() => {
    const difference = product.expiration_alert_date - Date.now()
    if (product.expiration <= Date.now()) return 'error'
    if (difference <= 0) return 'warning'
    return false
  })()
  // Alerta de bajo stock
  product.stockAlert = (() => {
    if (parseInt(product.quantity) <= 0) return 'error'
    if (parseInt(product.quantity) <= parseInt(product.low_stock_alert))
      return 'warning'
    return false
  })()
  return product
}
