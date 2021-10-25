import { DeleteOutlined } from '@ant-design/icons'
import useField from '../../hooks/useField'
import { useEffect, useState } from 'react'
import { timeToString } from '../../helpers/getTimeAgo'
import { CapturePage } from './CapturePage'

const ADD_NEW = '--new--'

export const Lote = ({
  onChange,
  onRemove,
  id,
  expiration: expire,
  quantity: qty = 0,
  codes: cds = [],
  code,
  concatCode,
  enabled = true,
  productCode,
}) => {
  const expiration = useField(timeToString(expire))
  const quantity = useField(qty)
  const [codes, setCodes] = useState(cds)
  const [codeValue, setCodeValue] = useState(code)
  const [capture, setCapture] = useState(false)

  const onCodeChange = (e) => {
    setCodeValue(e.target.value)
  }

  const onDetect = (code) => {
    console.log('Obtuvimos el código', code)
    setCapture(false)
    setCodes([...codes, code])
    setCodeValue(code)
  }

  const newCode = () => {
    setCapture(true)
  }

  useEffect(() => {
    if (codeValue === '') return false
    if (codeValue === ADD_NEW) return newCode()
    onChange({
      expiration: new Date(expiration.value).getTime(),
      quantity: parseInt(quantity.value),
      id,
      code: codeValue,
    })
  }, [expiration.value, quantity.value, codeValue])

  return (
    <>
      <div
        className={`grid-left border padding margin-b${
          enabled ? '' : ' disabled'
        }`}
      >
        <label className="margin-b-05">
          Fecha de expiración:
          <input type="date" {...expiration} required />
        </label>
        <label className="margin-b-05">
          Cantidad:
          <input type="number" {...quantity} required />
        </label>
        <button className="icon" onClick={onRemove}>
          <DeleteOutlined />
        </button>
        <label
          className="margin-b-0"
          style={{
            gridColumn: 'span 3',
          }}
        >
          Código de barras:
          <select
            value={codeValue}
            onChange={onCodeChange}
            required={true}
            disabled={codeValue === concatCode && codeValue !== productCode}
          >
            <option value="">Seleccione</option>
            <option value={ADD_NEW}>Nuevo código</option>
            {codes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>
      {capture && <CapturePage onDetect={onDetect} />}
    </>
  )
}
