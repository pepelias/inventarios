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
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')
    const context = canvas.getContext('2d')

    canvas.style.position = 'absolute'
    canvas.style.top = '0'

    video.setAttribute('autoplay', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('style', 'width: 100%')

    viewport.current.append(canvas, video)

    getVideo
      .init()
      .then(() => getVideo.video())
      .then((stream) => {
        window.BarcodeScanner.init()
        window.BarcodeScanner.streamCallback = function ([result]) {
          console.log('Decoded', result)
          window.BarcodeScanner.StopStreamDecode()
          // stream.stop()
          setCode(result.Value)
          // onDetect(result.value)
        }

        video.srcObject = stream
      })
      .catch((err) => console.error(err))

    video.addEventListener('loadedmetadata', (e) => {
      console.log('LoadedMetadata!')
      const canvasSetting = {
        x: 50,
        y: 20,
        width: 200,
        height: 30,
      }

      const rect = video.getBoundingClientRect()
      canvas.style.height = rect.height + 'px'
      canvas.style.width = rect.width + 'px'
      canvas.style.top = rect.top + 'px'
      canvas.style.left = rect.left + 'px'

      const overlayColor = 'rgba(71, 76, 85, .9)'
      context.fillStyle = overlayColor
      context.fillRect(0, 0, rect.width, rect.height)
      context.clearRect(
        canvasSetting.x,
        canvasSetting.y,
        canvasSetting.width,
        canvasSetting.height
      )

      context.strokeStyle = '#ff671f'
      context.strokeRect(
        canvasSetting.x,
        canvasSetting.y,
        canvasSetting.width,
        canvasSetting.height
      )
      video.play()
      window.BarcodeScanner.DecodeStream(video)
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
      <div id="barcode" ref={viewport}></div>
      {/* <div id="barcode">
        <video id="barcodevideo" autoPlay playsInline={true}></video>
        <canvas id="barcodecanvasg" ref={viewport}></canvas>
      </div>
      <canvas id="barcodecanvas"></canvas> */}
      <footer className="modal-footer">
        <h2>Code: {code || '0000000'}</h2>
        <button onClick={manualCode}>Escribir manualmente</button>
      </footer>
    </div>
  )
}
