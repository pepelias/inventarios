import { useState } from 'react'

const useField = (defaultValue = '', middle = (str) => str) => {
  const [value, setValue] = useState(defaultValue)
  const onChange = (e) => {
    switch (e.target.type) {
      case 'number':
        const value = e.nativeEvent.data
        if (value == null) break
        const test = /[0-9]/.test(value)
        if (!test) return e.preventDefault()
    }
    setValue(middle(e.target.value || e.target.innerText))
  }
  return { value, onChange }
}

export default useField
