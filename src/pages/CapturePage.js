import { useRef, useEffect, useState } from 'react'
import Quagga from 'quagga'
import { useHistory } from 'react-router'

export const CapturePage = () => {
  const viewport = useRef()
  const [code, setCode] = useState('000000000')
  const history = useHistory()
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
          readers: ['code_128_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err)
          return
        }
        alert('Leeremos code_128_reader')
        console.log('Initialization finished. Ready to start')
        Quagga.start()
      }
    )
    Quagga.onDetected((res) => {
      Quagga.stop()
      setCode(res.codeResult.code)
      history.push(`/make/${res.codeResult.code}`)
    })
  }, [viewport])
  return (
    <div className="capture-page">
      <div className="capture-page__viewport" ref={viewport}></div>
      <footer className="modal-footer">
        <h2>Code: {code}</h2>
        <button>Escribir manualmente</button>
      </footer>
    </div>
  )
}
