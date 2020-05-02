import React from 'react'

export function privatePage(Component) {
  function PrivatePage() {
    const { loggedIn } = useSession()

    React.useEffect(() => {
      if (loggedIn) return
      Router.replace('/private', '/login', { shallow: true })
    }, [loggedIn])
  }

  PrivatePage.displayName = `PrivatePage(${Component.name ||
    Component.displayName})`

  return PrivatePage
}
