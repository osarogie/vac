import { UserMenu } from './UserMenu'
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Avatar } from 'react-native-paper'
import { useViewer } from '../../providers/ViewerProvider'
import { Popover } from 'antd'

export function AppBar({}) {
  const [viewer] = useViewer()

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View
        style={{
          marginHorizontal: 20,
          height: 20,
          width: 1,
          backgroundColor: '#fff5',
        }}
      />
      <View key="user-controls" style={styles.row}>
        <Popover placement="bottomRight" trigger="click" content={<UserMenu />}>
          <View style={[styles.row, { cursor: 'pointer' }]}>
            <Avatar.Image
              style={{
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                cursor: 'pointer',
                backgroundColor: '#fff3',
                marginHorizontal: 30,
              }}
              size={40}
              source={{
                uri: 'https://icon.now.sh/person/000000',
                width: 30,
                height: 30,
              }}
            />
            <Text
              style={{
                color: '#242424',
                fontFamily: 'Livvic',
                fontSize: 19,
                fontWeight: '500',
              }}
            >
              {viewer?.FirstName}
            </Text>
          </View>
        </Popover>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 80,
    // boxShadow: '0 3px 8px 0 rgba(62, 100, 146, 0.16)',
    position: 'relative',
    borderBottomColor: '#eaf193',
    borderBottomWidth: 1,
    zIndex: 1000,
    paddingHorizontal: 30,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: 50,
    width: 130,
    marginEnd: 117,
  },
})
