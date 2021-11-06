import { login, useSession } from '../services/auth'
import { GoogleOutlined } from '@ant-design/icons'
import Icon from '../components/molecules/Icon'
import { Loading } from '../components/molecules/Loading'
import BusinessLogo from '../components/molecules/BusinessLogo'

const Login = () => {
  const user = useSession()
  if (user === undefined) return <Loading />
  const onClick = () => {
    login()
  }
  return (
    <div>
      <BusinessLogo />
      <button onClick={onClick}>
        <Icon icon={GoogleOutlined}>Ingresar con Google</Icon>
      </button>
    </div>
  )
}
export default Login
