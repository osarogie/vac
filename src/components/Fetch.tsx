import { PRIMARY } from '../styles/colors'
import * as React from 'react'
import { ApiResponse } from '../data/api'
import { View } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { notification } from 'antd'

type Props<T> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH'
  // onChange?: (values: FetchProps<T>) => void
  body:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | FormData
    | URLSearchParams
    | ReadableStream<Uint8Array>
    | null
    | undefined
  children: React.ReactElement
  onError: React.Dispatch<React.SetStateAction<string>>
  onFetch: React.Dispatch<React.SetStateAction<T | null>>
  onLoadingStatus: React.Dispatch<React.SetStateAction<boolean>>
}

// type FetchProps<T> = {
//   error: string | null
//   loading: boolean
//   data: T | null
// }

export function Fetch<T>({
  url,
  method = 'POST',
  body,
  children,
  onError,
  onFetch,
  onLoadingStatus,
}: Props<T>): React.ReactElement {
  // const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  // const [error, setError] = React.useState(null)

  React.useEffect(() => {
    loadData()
  }, [url, method, body])

  React.useEffect(() => {
    onLoadingStatus && onLoadingStatus(loading)
  }, [loading])

  async function loadData() {
    setLoading(true)

    try {
      const response: ApiResponse<T> = await fetch(`/api/proxy?url=${url}`, {
        method,
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response: Response) => response.json())

      if (response?.IsSuccessful) {
        onFetch(response.Data)
      } else {
        notification.error({
          message: 'Sorry',
          description: response?.Message,
        })
      }
    } catch (err) {
      console.error(err)
      onError && onError(err)
      notification.error({
        message: 'Sorry',
        description: err?.message,
      })
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}
      >
        <ActivityIndicator size={40} color={PRIMARY} />
      </View>
    )
  }

  return children || null
}
