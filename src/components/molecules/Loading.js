export const Loading = ({children}) => {
  return <div className="loading">
    {children && <span className="loading__content">{children}</span>}
  </div>
}