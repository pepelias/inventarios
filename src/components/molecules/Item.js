import { ShoppingCartOutlined } from '@ant-design/icons'

export const Item = ({ name, quantity, unit, expirationDate }) => {
  return (
    <div className="product-item">
      <div className="product-item__cover">
        <ShoppingCartOutlined />
      </div>
      <div className="product-item__data">
        <h1>{name}</h1>
        <p>
          <span>
            Stock: {quantity}
            {unit}
          </span>
          <span>Vence: {expirationDate}</span>
        </p>
      </div>
    </div>
  )
}
