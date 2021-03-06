import { useEffect, useState } from 'react'
import { units } from '../../../helpers/dictionary'
import { Item } from '../../molecules/Item'
import { calcProductAlerts } from '../../../helpers/calcProductAlerts'
import { Lote } from '../Lote'

const makeEmpty = () => ({
  id: Math.round(Math.random() * 9999),
  enabled: true,
})
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
  const [disableExpiration, setDisableExpiration] = useState(currentData.disableExpiration===true)


  const onChange = (index) => (data) => {
    const setLts = lotes.map((lote) =>
      index === lote.id ? { ...data, id: lote.id } : lote
    )
    setLotes(setLts)
  }

  const onRemove = (index) => (e) => {
    e.preventDefault()
    if (!confirm('Desea eliminar este lote?')) return false
    setLotes(lotes.filter(({ id }) => index !== id))
  }

  const preview = () => {
    setRealtimeCalc(
      calcProductAlerts(
        ProductExpirationFormHandler({ ...currentData, lotes: lotes, disableExpiration })
      )
    )
  }

  useEffect(preview, [lotes, currentData.name, disableExpiration])

  const addLote = (e) => {
    e.preventDefault()
    setLotes([...lotes, makeEmpty()])
  }

  // Previo al envío
  submitMiddleware((data) => {
    return { ...data, lotes, codes: currentData.codes, disableExpiration }
  })

  // Deshabilitar expiracion
  const changeExpirationHandler = (e) => {
    setDisableExpiration(e.target.checked)
  }

  return (
    <>
      <h2>Fechas de expiración por lotes:</h2>
      { realtimeCalc.name && <Item {...realtimeCalc} disabled={true} />}
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
      <input type="checkbox" name="unexpire" id="unexpire" defaultChecked={disableExpiration} onChange={changeExpirationHandler} />
      <label htmlFor="unexpire">No expira</label>
      {lotes.map((lote, index) => (
        <Lote
          key={index}
          onChange={onChange(lote.id)}
          onRemove={onRemove(lote.id)}
          {...lote}
          codes={currentData.codes}
          concatCode={currentData.concatCode}
          enabled={!currentData.concatCode || index >= lts.length}
          productCode={currentData.code}
          disableExpiration={disableExpiration}
        />
      ))}
      <a href="#" className="align-center" onClick={addLote}>
        Añadir otra fecha de expiración
      </a>
    </>
  )
}
export const ProductExpirationFormHandler = (data) => {
  let expiration = false
  let quantity = 0
  const codes = data.codes.length > 0 ? [...data.codes] : []

  data.lotes.forEach((lote) => {
    if(data.disableExpiration) expiration = 0
    else if (lote.quantity > 0 && (!expiration || lote.expiration < expiration))
      expiration = lote.expiration
    quantity += lote.quantity
    if (!codes.includes(lote.code)) codes.push(lote.code)
  })

  return { ...data, expiration: expiration || 0, quantity, codes }
}
