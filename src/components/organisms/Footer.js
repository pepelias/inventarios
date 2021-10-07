import { CameraOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="main-footer">
      <Link to="/make" className="button big-button">
        <CameraOutlined />
      </Link>
    </footer>
  )
}
