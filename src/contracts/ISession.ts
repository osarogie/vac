import { IViewer } from './IViewer'

export interface ISession {
  user?: IViewer
  isLoggedIn: boolean
  refetch: () => Promise<Error>
}
