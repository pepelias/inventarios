import useField from '../../../hooks/useField'
import { useEffect, useState } from 'react'
import { Item } from '../../molecules/Item'
import { useSelector } from 'react-redux'

export const ProductSelector = ({ currentData: { name, code, id:isEditing } }) => {
  const productName = useField(name)
  const [matches, setMatches] = useState([])
  const products = useSelector(({products}) => products)

  useEffect(() => {
    if(isEditing || productName.value === '') return false
    setMatches(Object.values(products).filter(product => {
      return product.name.toLowerCase().includes(productName.value.toLowerCase())
    }))
  },[productName.value])

  return (
    <>
      <label>
        Nombre del producto:
        <input type="text" name="name" {...productName} required autoFocus autoComplete="off" />
      </label>
      {!isEditing && (
        <ul className="products-list no-continue">
          {productName.value !== '' && matches.map(product => <Item key={product.id} {...product} concatCode={code} />)}
          {productName.value !== "" && <button className="link">Agregar nuevo producto: {productName.value}</button>}
        </ul>
      )}
    </>
  )
}
