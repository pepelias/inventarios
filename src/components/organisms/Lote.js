import { DeleteOutlined } from '@ant-design/icons'
import useField from '../../hooks/useField'
import { useEffect } from 'react'
import { timeToString } from '../../helpers/getTimeAgo'

export const Lote = ({
  onChange,
  onRemove,
  id,
  expiration: expire,
  quantity: qty,
}) => {
  const expiration = useField(timeToString(expire))
  const quantity = useField(qty)

  useEffect(() => {
    onChange({
      expiration: new Date(expiration.value).getTime(),
      quantity: parseInt(quantity.value),
      id,
    })
  }, [expiration.value, quantity.value])

  return (
    <div className="grid-left border padding margin-b">
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
    </div>
  )
}
