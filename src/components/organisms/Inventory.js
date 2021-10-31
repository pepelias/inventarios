import { useSelector } from 'react-redux'
import { Item } from '../molecules/Item'
import { DataStatus } from '../../redux/dataStatus'
import { Loading } from '../molecules/Loading'
import { useEffect, useState } from 'react'

export const Inventory = () => {
  const products = useSelector(({ products }) => products)
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (!products) return false
    setElements(Object.entries(products))
  }, [products])

  if (products === DataStatus.Loading) return <Loading />

  const search = (e) => {
    const value = e.target.value.toLowerCase()
    const all = Object.entries(products)

    const filtered = () => {
      return all.filter(([_, element]) => {
        if (element.name.toLowerCase().includes(value)) return true

        for (const code of element.codes) {
          if (code.includes(value)) return true
        }
        return false
      })
    }

    setElements(value === '' ? all : filtered())
  }

  const printElement = ([id, product]) => (
    <li key={id}>
      <Item {...product} />
    </li>
  )
  return (
    <>
      <input
        placeholder="Buscar entre los productos"
        onChange={search}
        className="margin-t"
      />
      <ul className="products-list">{elements.map(printElement)}</ul>
    </>
  )
}
