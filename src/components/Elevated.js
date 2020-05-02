import { View, StyleSheet } from 'react-native'

export function Elevated({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 35,
    boxShadow: '0 0 3px 0 rgba(37, 57, 177, 0.04)'
  }
})
