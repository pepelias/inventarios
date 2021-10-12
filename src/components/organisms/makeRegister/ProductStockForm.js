export const ProductStockForm = () => {
  return (
    <>
      <label>
        Nombre del producto:
        <input type="text" name="name" required autoFocus />
      </label>
      <label>
        Comentario (opcional):
        <textarea name="comment" />
      </label>
    </>
  )
}
