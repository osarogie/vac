import { ReactRelayContext } from "react-relay"
import { useContext } from "react"

export function useEnvironment() {
  const { environment } = useContext(ReactRelayContext)
  return environment
}
