import Icon from 'antd/lib/icon'
import { notification } from 'antd'

export function showError(description) {
  notification.error({
    icon: <Icon type="frown" style={{ color: 'red' }} />,
    message: 'Oops',
    description
  })
}
