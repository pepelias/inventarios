import { useRef } from 'react'

export const Modal = ({ children, onClose }) => {
  const modal = useRef()
  const close = (e) => {
    if (e.target !== modal.current) return false
    if (onClose) return onClose()
    modal.current.remove()
  }
  return (
    <div className="modal" ref={modal} onClick={close}>
      <div className="modal__container">{children}</div>
    </div>
  )
}
