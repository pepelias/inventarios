import { useSelector } from 'react-redux'
import { DataStatus } from '../redux/dataStatus'

const useProduct = (id) => {
  return useSelector(({ products }) => {
    if (products === DataStatus.Loading) return DataStatus.Loading
    return Object.values(products).find((product) => {
      return product.codes.includes(id)
    })
  })
}
export default useProduct