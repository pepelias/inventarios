import { useState } from 'react'
import { units } from '../../../helpers/dictionary'
import { Lote } from '../Lote'

export const ProductExpirationForm = ({ submitMiddleware }) => {
  const makeEmpty = () => ({ id: Math.round(Math.random() * 9999) })
  const [lotes, setLotes] = useState([makeEmpty()])

  const onChange = (index) => (data) => {
    setLotes(
      lotes.map((lote) => (index === lote.id ? { ...data, id: lote.id } : lote))
    )
  }

  const onRemove = (index) => (e) => {
    e.preventDefault()
    setLotes(lotes.filter(({ id }) => index !== id))
  }

  const addLote = (e) => {
    e.preventDefault()
    setLotes([...lotes, makeEmpty()])
  }

  // Previo al envío
  submitMiddleware((data) => {
    return { ...data, lotes }
  })

  return (
    <>
      <h2>Fechas de expiración por lotes:</h2>
      <h3 className="up-content margin-b-2 padding-t-05 metadata-color">
        Dejar en 0 stock para omitir
      </h3>
      <label className="margin-b">
        Unidad de Medida:
        <select name="unit">
          {Object.entries(units).map(([unit, label]) => (
            <option key={unit} value={unit}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {lotes.map((lote) => (
        <Lote
          key={lote.id}
          onChange={onChange(lote.id)}
          onRemove={onRemove(lote.id)}
          id={lote.id}
        />
      ))}
      <a href="#" className="align-center" onClick={addLote}>
        Añadir otra fecha de expiración
      </a>
    </>
  )
}
export const ProductExpirationFormHandler = (data) => {
  let expiration
  let quantity = 0

  data.lotes.forEach((lote) => {
    if (!expiration || lote.expiration < expiration)
      expiration = lote.expiration
    quantity += lote.quantity
  })

  return { ...data, expiration, quantity }
}
