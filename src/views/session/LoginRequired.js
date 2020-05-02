import Head from 'next/head'
import React from 'react'

export function LoginRequired({ statusCode }) {
  return (
    <>
      <Head>
        <title>Oops! Someone's lost!</title>
        <meta charSet="UTF-8" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <link
          href="https://fonts.googleapis.com/css?family=Bitter"
          rel="stylesheet"
        />
      </Head>

      <div className="center error">
        <div>
          <b className="extra">404</b>
          <p>
            You might need to{' '}
            <a href="/login">
              <u>login</u>
            </a>{' '}
            🙂
          </p>
          <div style={{ marginTop: 70 }}>
            Go back <a href="/">Home</a>
          </div>
        </div>
        <a href="/">
          <img
            className="logo mt20 center"
            src="/images/logo3.png"
            alt="Logo3"
            style={{
              height: 31,
              width: 31
            }}
          />
        </a>
      </div>
    </>
  )
}

LoginRequired.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null
  return { statusCode }
}
