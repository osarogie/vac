import * as React from 'react'
import { ISession } from '../contracts/ISession'

const defaultSession: ISession = {
  isLoggedIn: false,
  refetch() {
    return new Promise<Error>(resolve => {
      resolve(undefined)
    })
  }
}

export const SessionContext = React.createContext(defaultSession)

export function useViewer(): ISession {
  return React.useContext(SessionContext)
}
