import { BarcodeOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { CapturePage } from './CapturePage'

export const Footer = () => {
  const history = useHistory()
  const [capture, setCapture] = useState(false)
  const onDetect = (code) => {
    history.push(`/editor/${code}`)
  }
  const show = (e) => {
    e.preventDefault()
    setCapture(true)
  }
  return (
    <>
      <footer className="main-footer">
        <button className="button big-button" onClick={show}>
          <BarcodeOutlined />
        </button>
      </footer>
      {capture && <CapturePage onDetect={onDetect} />}
    </>
)
}
