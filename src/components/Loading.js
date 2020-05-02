import { PRIMARY } from '../styles/colors'
import React from 'react'
import { Spin } from 'antd'
import { View } from 'react-native'
import Head from './head'
import { appName } from '../values/strings'

export default () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      justifyContent: 'center'
    }}
  >
    <Head title={appName} />
    <Spin size="large" color={PRIMARY} />
  </View>
)
