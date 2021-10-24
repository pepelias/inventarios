import useField from '../../hooks/useField'
import { timeToString } from '../../helpers/getTimeAgo'
import { useState } from 'react'

export const DiscounterLote = ({ onChange, ...lote }) => {
  const expiration = useField(timeToString(lote.expiration))
  const [quantity, setQuantity] = useState(lote.quantity)

  const chageDiscount = (e) => {
    let value = e.target.value
    if (!/[0-9]/.test(value) || value < 0) value = 0
    else if (value > lote.quantity) value = lote.quantity
    const q = lote.quantity - value
    setQuantity(q)
    e.target.value = value
    onChange({ ...lote, quantity: q })
  }

  return (
    <>
      <div className={`grid-left border padding margin-b`}>
        <label className="margin-b-05" disabled>
          Fecha de expiración:
          <input type="date" {...expiration} disabled />
        </label>
        <label className="margin-b-05">
          Descontar:
          <input
            type="number"
            onChange={chageDiscount}
            max={lote.quantity}
            defaultValue="0"
            required
          />
        </label>
        <span></span>
        <label className="margin-b-0" disabled>
          Código de barras:
          <input value={lote.code} disabled />
        </label>
        <label className="margin-b-0" disabled>
          Cantidad final:
          <input type="number" value={quantity} disabled />
        </label>
      </div>
    </>
  )
}
