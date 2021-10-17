export const ProductStockForm = ({ currentData: { name, comment, code } }) => {
  return (
    <>
      <label>
        Nombre del producto:
        <input type="text" name="name" defaultValue={name} required autoFocus />
      </label>
      <label>
        Comentario (opcional):
        <textarea name="comment" defaultValue={comment} />
      </label>
    </>
  )
}
