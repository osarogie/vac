import { useState, useEffect } from 'react'

export function useDebounce(effect, deps, timeout = 500) {
  useEffect(() => {
    const id = setTimeout(() => {
      effect()
    }, timeout)

    return () => {
      clearTimeout(id)
    }
  }, deps)
}

export function useDebounceState(initialValue, timeout = 500) {
  const [value, setValue] = useState(initialValue)
  const [buffer, setBuffer] = useState(initialValue)

  useDebounce(
    () => {
      setValue(buffer)
    },
    [buffer],
    timeout
  )

  return [value, setBuffer]
}
