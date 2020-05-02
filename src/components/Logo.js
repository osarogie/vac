import { Image } from 'react-native'
import Link from 'next/link'

export function Logo({ size = 30, style, href }) {
  if (!href) {
    return (
      <Image
        source={require('../assets/logo.jpeg')}
        resizeMode="contain"
        style={[
          {
            width: size * 0.89,
            height: size,
          },
          style,
        ]}
      />
    )
  }

  return (
    <Link href={href} passHref>
      <Image
        href={href}
        accessibilityRole="link"
        source={require('../assets/logo.jpeg')}
        resizeMode="contain"
        style={[
          {
            width: size * 0.89,
            height: size,
          },
          style,
        ]}
      />
    </Link>
  )
}
