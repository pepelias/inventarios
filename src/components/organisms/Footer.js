import { BarcodeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="main-footer">
      <Link to="/capture" className="button big-button">
        <BarcodeOutlined />
      </Link>
    </footer>
  )
}
