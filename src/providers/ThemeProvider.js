import { PRIMARY } from '../styles/colors'
import Head from 'next/head'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY,
    accent: PRIMARY,
  },
}

export function ThemeProvider({ children }) {
  return (
    <PaperProvider theme={theme}>
      <Head>
        <style type="text/css">{`
        @font-face {
          font-family: 'MaterialIcons';
          src: url(/fonts/MaterialIcons.ttf) format('truetype');
        }
        @font-face {
          font-family: 'MaterialCommunityIcons';
          src: url(/fonts/MaterialCommunityIcons.ttf) format('truetype');
        }
        @font-face {
          font-family: 'Feather';
          src: url(/fonts/Feather.ttf) format('truetype');
        }`}</style>
      </Head>
      {children}
    </PaperProvider>
  )
}
