import { useEffect, useRef, useState } from 'react'
import { Modal } from '../molecules/Modal'
import useField from '../../hooks/useField'
import { getVideo } from '../../helpers/mediaStream'

export const CapturePage = ({ onDetect }) => {
  const viewport = useRef()
  const [code, setCode] = useState()
  const [showModal, setShowModal] = useState(false)
  const manualCodeInput = useField('')

  // Inicializar lector
  useEffect(() => {
    if (!viewport.current) return false
    window.barcode.config.start = 0.1
    window.barcode.config.end = 0.9
    window.barcode.config.video = '#barcodevideo'
    window.barcode.config.canvas = '#barcodecanvas'
    window.barcode.config.canvasg = '#barcodecanvasg'
    window.barcode.setHandler(function (barcode) {
      console.log('Obtuvimos un barcode')
      setCode(barcode)
    })
    getVideo.video().then((stream) => {
      window.barcode.init(stream)
    })
  }, [viewport])

  // Obtener codeBar
  useEffect(() => {
    if (!code) return false
    onDetect(code)
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
          <div>
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
            <button onClick={setManualCode}>Continuar</button>
          </div>
        </Modal>
      )}
      <div id="barcode">
        <video id="barcodevideo" autoPlay playsInline={true}></video>
        <canvas id="barcodecanvasg" ref={viewport}></canvas>
      </div>
      <canvas id="barcodecanvas"></canvas>
      <footer className="modal-footer">
        <h2>Code: {code || '0000000'}</h2>
        <button onClick={manualCode}>Escribir manualmente</button>
      </footer>
    </div>
  )
}
