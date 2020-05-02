import Document, { Html, Head, Main, NextScript } from 'next/document'
import { AppRegistry } from 'react-native'
import { FavIcons } from '../components/FavIcons'

export default class MyDocument extends Document {
  static getInitialProps = async ({ renderPage, req, ...ctx }) => {
    const initialProps = await Document.getInitialProps({
      renderPage,
      req,
      ...ctx,
    })

    AppRegistry.registerComponent('Main', () => Main)
    const { stylesheet, getStyleElement } = AppRegistry.getApplication('Main')
    const page = renderPage()
    const styles = (
      <>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {getStyleElement()}
      </>
    )

    return {
      ...initialProps,
      ...page,
      styles,
      ctx: { ...initialProps.ctx },
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <FavIcons />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/css?family=Livvic:400,700|Roboto:500&display=swap"
            rel="stylesheet"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js" />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAhNPMzuc6iTlwT4V6G0ECh0saFYwxWerI&libraries=places"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
