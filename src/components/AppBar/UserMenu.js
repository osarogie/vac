import BrowserLink from '../link/BrowserLink'

export function UserMenu() {
  return (
    <div style={{ minWidth: 300 }}>
      <BrowserLink
        href="/password/update"
        style={{ display: 'block', marginBottom: 10 }}
      >
        Change Password
      </BrowserLink>
      {/*<BrowserLink
        href="/settings"
        style={{ display: 'block', marginBottom: 10 }}
      >
        Settings
      </BrowserLink>*/}
      <BrowserLink href="/login" style={{ display: 'block', marginBottom: 10 }}>
        Logout
      </BrowserLink>
    </div>
  )
}
