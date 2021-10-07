import { useState } from 'react'

const useField = (defaultValue, middle = (str) => str) => {
  const [value, setValue] = useState(defaultValue)
  const onChange = (e) => {
    setValue(middle(e.target.value || e.target.innerText))
  }
  return { value, onChange }
}

export default useField
