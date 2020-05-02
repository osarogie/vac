import { useEffect, useCallback, useState } from 'react'
import { notification } from 'antd'
import { apiRequest } from './request'

type Req = {
  loading: boolean
  reload: () => void
  error?: string
}
type Result<T> = [T | undefined, Req]

export function useFetch<T>(
  url: string,
  { body = {} } = {},
  deps: any[] = []
): Result<T> {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  const loadData = useCallback(() => {
    setLoading(true)
    apiRequest<T>(url, { body }).then(({ response, error }) => {
      setLoading(false)
      if (response?.IsSuccessful) {
        setData(response.Data)
      } else {
        setError(response?.Message ?? error?.message)
        notification.error({
          message: 'Sorry',
          description: response?.Message ?? error?.message,
        })
      }
    })
  }, [url, body])

  useEffect(() => {
    loadData()
  }, deps)

  return [data, { loading, reload: loadData, error }]
}
