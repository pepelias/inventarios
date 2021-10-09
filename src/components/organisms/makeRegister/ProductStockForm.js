export const ProductStockForm = () => {
  return (
    <>
      <label>
        Nombre del producto:
        <input type="text" name="name" required autoFocus />
      </label>
      <label>
        Fecha de expiración:
        <input type="date" name="expirationDate" required />
      </label>
      <div className="grid-left">
        <label>
          Cantidad:
          <input type="number" name="quantity" required />
        </label>
        <label>
          Medida:
          <select name="unit">
            <option value="kg">KG</option>
            <option value="lts">LTS</option>
            <option value="paquetes">PAQUETES</option>
            <option value="unidades">UNIDADES</option>
            <option value="cajas">CAJAS</option>
            <option value="bolsas">BOLSAS</option>
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
