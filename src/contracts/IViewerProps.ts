import { IViewer } from './IViewer'

export interface IViewerProps {
  viewer?: IViewer
  hasViewer: boolean
  refetch: () => void
  requireViewer: () => boolean
}
