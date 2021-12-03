import { LogoutOutlined } from '@ant-design/icons'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import Icon from '../components/molecules/Icon'
import { AlertsList } from '../components/organisms/AlertsList'
import { Footer } from '../components/organisms/Footer'
import { Inventory } from '../components/organisms/Inventory'
import { TabsNavigator } from '../components/organisms/TabsNavigator'
import { loadProducts } from '../redux/actionCreators'
import { getSession, logout } from '../services/auth'

const DashboardPage = () => {
  const user = getSession()
  const history = useHistory()
  const dispatch = useDispatch()
  const logoutClick = async () => {
    await logout()
    history.push('/login')
  }
  const loader = useCallback(() => {
    dispatch(loadProducts())
  },[user])
  useEffect(() => loader(),[user])
  return (
    <main className="dashboard">
      <nav className="main-navigator">
        <button className="icon" onClick={logoutClick}>
          <Icon icon={LogoutOutlined} />
        </button>
        <h1>Dashboard</h1>
        <img
          className="profile-image"
          src={user.photoURL}
          alt={user.displayName}
        />
      </nav>
      <div className="content">
        <header className="main-header">
          <h1 className="up-title">{user.displayName}</h1>
          <h2 className="up-content">{user.email}</h2>
        </header>
        <TabsNavigator
          tabs={['Alertas', 'Inventario']}
          sections={[AlertsList, Inventory]}
        />
      </div>
      <Footer />
    </main>
  )
}
export default DashboardPage
