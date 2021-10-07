import { LeftOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import useField from '../hooks/useField'
import { addProduct } from '../redux/actionCreators'

export const MakeRegister = () => {
  const name = useField('')
  const date = useField('')
  const qty = useField('')
  const unit = useField('')
  const comment = useField('')
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    const save = {
      name: name.value,
      expiration: date.value,
      qty: qty.value,
      unit: unit.value,
      comment: comment.value,
    }
    dispatch(addProduct(save))
    history.push('/')
  }

  return (
    <main className="make-register modal-page">
      <header className="modal-page__header">
        <Link to="/">
          <LeftOutlined />
        </Link>
        <h1>Añadir nuevo producto</h1>
      </header>
      <form className="modal-page__content" onSubmit={onSubmit}>
        <h2 className="align-center margin-y-2">Code: 11 234 2333 23</h2>
        <label>
          Nombre del producto:
          <input type="text" {...name} required autoFocus />
        </label>
        <label>
          Fecha de expiración:
          <input type="date" required {...date} />
        </label>
        <div className="grid-left">
          <label>
            Cantidad:
            <input type="number" required {...qty} />
          </label>
          <label>
            Medida:
            <select type="text" {...unit}>
              <option value="kg">Kg</option>
              <option value="lt">Lt</option>
              <option value="g">G</option>
            </select>
          </label>
        </div>
        <label>
          Comentario (opcional):
          <textarea {...comment} />
        </label>

        <button className="super margin-t-3">Guardar</button>
      </form>
    </main>
  )
}
