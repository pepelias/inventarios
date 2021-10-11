import { units } from '../../../helpers/dictionary'

export const ProductStockForm = () => {
  return (
    <>
      <label>
        Nombre del producto:
        <input type="text" name="name" required autoFocus />
      </label>
      <label>
        Fecha de expiración:
        <input type="date" name="expiration_date" required />
      </label>
      <div className="grid-left">
        <label>
          Cantidad:
          <input type="number" name="quantity" required />
        </label>
        <label>
          Medida:
          <select name="unit">
            {Object.entries(units).map(([unit, label]) => (
              <option key={unit} value={unit}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Comentario (opcional):
        <textarea name="comment" />
      </label>
    </>
  )
}
