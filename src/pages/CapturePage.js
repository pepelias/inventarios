import { useRef, useEffect, useState } from 'react'
import Quagga from 'quagga'
import { useHistory } from 'react-router'
import { Modal } from '../components/molecules/Modal'
import useField from '../hooks/useField'

export const CapturePage = () => {
  const viewport = useRef()
  const [code, setCode] = useState()
  const [showModal, setShowModal] = useState(false)
  const manualCodeInput = useField('')
  const history = useHistory()

  // Inicializar lector
  useEffect(() => {
    if (!viewport.current) return false
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: viewport.current, // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ['ean_reader', 'upc_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err)
          return
        }
        console.log('Librería quagga inicializada')
        Quagga.start()
      }
    )
    Quagga.onDetected((res) => {
      console.log(res)
      setCode(res.codeResult.code)
    })
  }, [viewport])

  // Obtener codeBar
  useEffect(() => {
    if (!code) return false
    Quagga.stop()
    history.push(`/make/${code}`)
  }, [code])

  const manualCode = () => setShowModal(!showModal)
  const setManualCode = (e) => {
    e.preventDefault()
    setCode(manualCodeInput.value)
  }

  return (
    <div className="capture-page">
      {showModal && (
        <Modal onClose={manualCode}>
          <form onSubmit={setManualCode}>
            <label>
              Código del producto:
              <input
                type="number"
                id="code"
                required
                autoFocus
                {...manualCodeInput}
              />
            </label>
            <button>Continuar</button>
          </form>
        </Modal>
      )}
      <div className="capture-page__viewport" ref={viewport}></div>
      <footer className="modal-footer">
        <h2>Code: {code || '0000000'}</h2>
        <button onClick={manualCode}>Escribir manualmente</button>
      </footer>
    </div>
  )
}
