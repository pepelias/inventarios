import { Route, Redirect } from 'react-router-dom'
import { useSession } from '../../services/auth'

const PublicRoute = (params) => {
  const user = useSession()
  if (!user) return <Route {...params} />
  return <Redirect to="/" />
}

export default PublicRoute
