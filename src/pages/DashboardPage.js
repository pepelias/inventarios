import { AlertsList } from '../components/organisms/AlertsList'
import { Footer } from '../components/organisms/Footer'
import { Inventory } from '../components/organisms/Inventory'
import { TabsNavigator } from '../components/organisms/TabsNavigator'

export const DashboardPage = () => {
  return (
    <main className="dashboard">
      <nav className="main-navigator">
        <h1>Dashboard</h1>
      </nav>
      <div className="content">
        <header className="main-header">
          <h1 className="up-title">Hola Mariela</h1>
          <h2 className="up-content">Encargada de bodega</h2>
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
