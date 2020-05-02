import { PRIMARY } from '../styles/colors'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { Logo } from '../components/Logo'

export function BackDrop({ children, imageSource }) {
  return (
    <ImageBackground style={styles.container} source={imageSource}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={styles.row}>
          <Logo size={100} style={styles.logo} />
          <View style={styles.inner}>{children}</View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>
}

function Subtitle({ children, style }) {
  return <Text style={[styles.title, styles.subtitle, style]}>{children}</Text>
}

BackDrop.Title = Title
BackDrop.Subtitle = Subtitle

const styles = StyleSheet.create({
  logo: { marginVertical: 60 },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: PRIMARY,
  },
  content: {
    justifyContent: 'center',
    minHeight: '100%',
  },
  inner: {
    boxShadow: '0 0 3px 0 rgba(37, 57, 177, 0.04)',
    maxWidth: 700,
    minWidth: 400,
    width: '100%',
    borderRadius: 22,
    backgroundColor: '#ffffff',
    paddingHorizontal: '5%',
    paddingVertical: 30,
    marginHorizontal: 50,
  },
  title: {
    fontFamily: 'Livvic',
    fontSize: 36,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#0d2133',
    maxWidth: 400,
  },
  subtitle: {
    fontSize: 18,
    maxWidth: 536,
    color: 'rgba(0, 52, 89, 0.33)',
  },
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
