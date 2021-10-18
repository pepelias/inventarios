import { useSelector } from 'react-redux'
import { DataStatus } from '../redux/dataStatus'

const useProduct = (id) => {
  return useSelector(({ products }) => {
    if(products === DataStatus.Loading) return DataStatus.Loading
    return products[id]
  })
}
export default useProduct