import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { MakeRegister } from './pages/MakeRegister'
import { CapturePage } from './pages/CapturePage'
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadProducts } from './redux/actionCreators'
import './scss/main.scss'

store.dispatch(loadProducts())

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={DashboardPage} exact />
          <Route path="/capture" component={CapturePage} exact />
          <Route path="/make/:code" component={MakeRegister} exact />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App

// eslint-plugin-react eslint-config-standard eslint eslint-plugin-import eslint-plugin-node eslint-plugin-promise
