import { useEffect, useState } from 'react'
import { units } from '../../../helpers/dictionary'
import { Item } from '../../molecules/Item'
import { calcProductAlerts } from '../../../helpers/calcProductAlerts'
import { Lote } from '../Lote'

const makeEmpty = () => ({ id: Math.round(Math.random() * 9999) })
export const ProductExpirationForm = ({
  submitMiddleware,
  currentData: { lotes: lts, ...currentData },
}) => {
  let initialLotes = lts
  if (!lts || lts.length === 0)
    initialLotes = [{ ...makeEmpty(), code: currentData.code }]
  else if (currentData.concatCode)
    initialLotes = [...lts, { ...makeEmpty(), code: currentData.concatCode }]
  const [lotes, setLotes] = useState(initialLotes)
  const [realtimeCalc, setRealtimeCalc] = useState({ ...currentData, lotes })

  const onChange = (index) => (data) => {
    const setLts = lotes.map((lote) =>
      index === lote.id ? { ...data, id: lote.id } : lote
    )
    setLotes(setLts)
  }

  const onRemove = (index) => (e) => {
    e.preventDefault()
    setLotes(lotes.filter(({ id }) => index !== id))
  }

  useEffect(() => {
    setRealtimeCalc(
      calcProductAlerts(
        ProductExpirationFormHandler({ ...currentData, lotes: lotes })
      )
    )
  }, [lotes])

  const addLote = (e) => {
    e.preventDefault()
    setLotes([...lotes, makeEmpty()])
  }

  // Previo al envío
  submitMiddleware((data) => {
    return { ...data, lotes, codes: currentData.codes }
  })

  return (
    <>
      <h2>Fechas de expiración por lotes:</h2>
      <Item {...realtimeCalc} disabled={true} />
      <label className="margin-b">
        Unidad de Medida:
        <select
          name="unit"
          defaultValue={currentData.unit}
          disabled={currentData.concatCode}
        >
          {Object.entries(units).map(([unit, label]) => (
            <option key={unit} value={unit}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {lotes.map((lote, index) => (
        <Lote
          key={index}
          onChange={onChange(lote.id)}
          onRemove={onRemove(lote.id)}
          {...lote}
          codes={currentData.codes}
          concatCode={currentData.concatCode}
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
  const codes = data.codes.length > 0 ? [...data.codes] : []

  data.lotes.forEach((lote) => {
    if (!expiration || lote.expiration < expiration)
      expiration = lote.expiration
    quantity += lote.quantity
    if (!codes.includes(lote.code)) codes.push(lote.code)
  })

  return { ...data, expiration: expiration || 0, quantity, codes }
}
