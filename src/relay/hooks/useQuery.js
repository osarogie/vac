import { useCallback, useState } from "react"
import { useEnvironment } from "./useEnvironment"
import { fetchQuery } from "react-relay"
import { createOperationDescriptor, getRequest } from "relay-runtime"

export function useQuery({ query, variables }, deps) {
  const environment = useEnvironment()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const fetchData = useCallback(async () => {
    setLoading(true)

    try {
      const queryProps = await fetchQuery(environment, query, variables)
      setData(queryProps)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

    // const queryConcreteRequest = getRequest(query)

    // const requestIdentifier = createOperationDescriptor(
    //   queryConcreteRequest,
    //   variables
    // )
    // const pageData = environment.lookup(requestIdentifier.fragment)
  }, [query, variable])

  return [data, { loading, run: fetchData }]
}
