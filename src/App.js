import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadProducts } from './redux/actionCreators'
import './scss/main.scss'
import MakeProduct from './pages/MakeProduct'
import CocatCode from './pages/ConcatCode'
import SearchCode from './pages/SearchCode'
import Decrement from './pages/Decrement'

store.dispatch(loadProducts())

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={DashboardPage} exact />
          <Route path="/editor/:id" component={MakeProduct} exact />
          <Route path="/concat-code/:id/:code" component={CocatCode} exact />
          <Route path="/searchCode/:code" component={SearchCode} exact />
          <Route path="/decrement/:id/:code" component={Decrement} exact />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

// eslint-plugin-react eslint-config-standard eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise
