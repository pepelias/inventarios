export const calcProductAlerts = (product) => {
  console.log('product', product)
  // Alerta de expiración
  if (product.lotes.length === 0)
    return { ...product, expirationAlert: false, stockAlert: false }
  product.expirationAlert = (() => {
    if(product.expiration === 0) return false
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
