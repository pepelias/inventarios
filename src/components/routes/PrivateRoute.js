import { Route, Redirect } from 'react-router-dom'
import { getSession } from '../../services/auth'

const PrivateRoute = (params) => {
  const user = getSession()
  if (user) return <Route {...params} />
  return <Redirect to="/login" />
}

export default PrivateRoute
