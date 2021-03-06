import useField from '../../hooks/useField'
import { timeToString } from '../../helpers/getTimeAgo'
import { useState } from 'react'

export const DiscounterLote = ({ onChange, ...lote }) => {
  console.log('Lote', lote)
  const expiration = useField(timeToString(lote.expiration))
  const [quantity, setQuantity] = useState(lote.quantity)

  const chageDiscount = (e) => {
    let value = e.target.value
    if (value !== '' && (!/[0-9]/.test(value) || value < 0)) value = 0
    else if (value > lote.quantity) value = lote.quantity
    const q = lote.quantity - value || 0
    setQuantity(q)
    e.target.value = value
    onChange({ ...lote, quantity: q })
  }

  const focus = (e) => {
    if (e.target.value === '0') e.target.value = ''
  }

  return (
    <>
      <div className={`grid-left border padding margin-b`}>
        {!lote.disableExpiration && (
          <label className="margin-b-05" disabled>
            Fecha de expiración:
            <input type="date" {...expiration} disabled />
          </label>
        )}
        <label className={`margin-b-05 ${lote.disableExpiration ? 'span-2' : ''}`}>
          Descontar:
          <input
            type="number"
            onChange={chageDiscount}
            max={lote.quantity}
            defaultValue="0"
            onFocus={focus}
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
