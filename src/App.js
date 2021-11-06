import { BrowserRouter as Router, Switch } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadProducts } from './redux/actionCreators'
import './scss/main.scss'
import MakeProduct from './pages/MakeProduct'
import CocatCode from './pages/ConcatCode'
import SearchCode from './pages/SearchCode'
import Decrement from './pages/Decrement'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import Login from './pages/Login'

store.dispatch(loadProducts())

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PrivateRoute path="/" component={DashboardPage} exact />
          <PrivateRoute path="/editor/:id" component={MakeProduct} exact />
          <PrivateRoute
            path="/concat-code/:id/:code"
            component={CocatCode}
            exact
          />
          <PrivateRoute path="/searchCode/:code" component={SearchCode} exact />
          <PrivateRoute
            path="/decrement/:id/:code"
            component={Decrement}
            exact
          />
          <PublicRoute path="/login" component={Login} exact />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

// eslint-plugin-react eslint-config-standard eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise
