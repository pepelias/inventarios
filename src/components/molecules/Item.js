import { ShoppingCartOutlined } from '@ant-design/icons'

export const Item = ({ name, qty, unit, expiration }) => {
  return (
    <div className="product-item">
      <div className="product-item__cover">
        <ShoppingCartOutlined />
      </div>
      <div className="product-item__data">
        <h1>{name}</h1>
        <p>
          <span>
            Stock: {qty}
            {unit}
          </span>
          <span>Vence: {expiration}</span>
        </p>
      </div>
    </div>
  )
}
