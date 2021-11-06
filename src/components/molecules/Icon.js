const Icon = ({ icon: Icone, children }) => {
  return (
    <>
      <Icone style={{ fontSize: 'var(--fs-icons)' }} />
      {children && <span>{children}</span>}
    </>
  )
}

export default Icon
