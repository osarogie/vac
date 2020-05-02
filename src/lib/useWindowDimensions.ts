import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState<ScaledSize>(() =>
    Dimensions.get('window')
  )

  useEffect(() => {
    function handler({ window }: { window: ScaledSize; screen: ScaledSize }) {
      setDimensions(window)
    }

    Dimensions.addEventListener('change', handler)

    setDimensions(Dimensions.get('window'))

    return () => {
      Dimensions.removeEventListener('change', handler)
    }
  }, [])

  return dimensions
}
