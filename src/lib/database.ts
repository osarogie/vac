import { ISessionDetails } from '../contracts/ISessionDetails'
import localforage from 'localforage'

interface IDatabase extends LocalForage {
  getSessionDetails(): Promise<ISessionDetails>
  setSessionDetails(details: ISessionDetails): Promise<ISessionDetails>
}

// @ts-ignore
export const database: IDatabase = localforage.createInstance({
  name: 'vaclogistics',
  version: 1.0,
})

database.getSessionDetails = () => database.getItem('session')

database.setSessionDetails = (details: any = null) => {
  return database.setItem('session', details)
}
