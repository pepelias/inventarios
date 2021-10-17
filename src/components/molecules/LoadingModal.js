import { Loading } from './Loading'

const LoadingModal = ({children}) => {
  return <div className="modal">
    <Loading>{children}</Loading>
  </div>
}
export default LoadingModal