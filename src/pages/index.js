import { RoundButton } from './../components/RoundButton'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native'
import { ACCENT, PRIMARY } from '../styles/colors'
import { CustomHead } from '../components/CustomHead'
import { Logo } from '../components/Logo'
import Link from 'next/link'
import { useWindowDimensions } from '../lib/useWindowDimensions'
import { SelectPlaces } from '../components/SelectPlaces'

function BigScreenOnly({ children }) {
  const { width } = useWindowDimensions()

  if (width < 400) return null

  return children
}

function PlaceInput({ label, style, placeholder }) {
  return (
    <View style={style}>
      <Text style={{ color: ACCENT, fontSize: 20, marginBottom: 10 }}>
        {label}
      </Text>
      <SelectPlaces placeholder={placeholder} />
    </View>
  )
}

export default function Index() {
  return (
    <ImageBackground
      style={{ backgroundColor: '#fff', flex: 1, position: 'relative' }}
    >
      <CustomHead title="VAC Logistics" />

      <Image
        source={require('../assets/petal.svg')}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          right: -50,
          top: -50,
        }}
      />

      <Image
        source={require('../assets/petal.svg')}
        style={{
          width: 200,
          height: 200,
          position: 'absolute',
          left: -50,
          bottom: -50,
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            position: 'relative',
          }}
        >
          <View style={styles.top}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 50,
              }}
            >
              <Logo size={150} />

              <View style={{ flex: 1 }} />

              <BigScreenOnly>
                <Text accessibilityRole="link" style={styles.navLink}>
                  Service
                </Text>
                <Text accessibilityRole="link" style={styles.navLink}>
                  Pricing
                </Text>
                <Text accessibilityRole="link" style={styles.navLink}>
                  About Us
                </Text>
              </BigScreenOnly>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ flex: 3 }}>
                <Text
                  style={{
                    fontSize: 67 * 0.7,
                    color: ACCENT,
                    fontFamily: 'Livvic',
                    fontWeight: 'bold',
                  }}
                >
                  Delivery Services
                </Text>
                <Text
                  style={{
                    fontSize: 27 * 0.7,
                    color: '#927d8a',
                  }}
                >
                  We are committed to handling your deliveries with efficiency.
                  We are fast, easy and reliable
                </Text>
                {/* <View style={{ flexDirection: 'row', marginTop: 49 }}>
                <Image
                  source={require('../assets/320px-Google_Play_Store_badge_EN.svg.png')}
                  style={{
                    width: 238.4 * 0.7,
                    height: 70.4 * 0.7,
                    marginEnd: 20,
                  }}
                />
                <Image
                  source={require('../assets/download-on-the-app-store-apple@2x.png')}
                  style={{
                    width: 238.4 * 0.7,
                    height: 70.4 * 0.7,
                  }}
                />
              </View> */}
                <View style={styles.locationInputCOntainer}>
                  <PlaceInput
                    label="Pickup From"
                    style={{ marginRight: 20, flex: 1 }}
                  />
                  <PlaceInput
                    label="Deliver To"
                    style={{ flex: 1 }}
                    placeholder="e.g. 47 Coker Road"
                  />
                </View>
              </View>
              <View
                style={{ marginTop: -60, position: 'relative', zIndex: -1 }}
              >
                <Image
                  source={require('../assets/clouds.svg')}
                  style={{
                    height: 300,
                    width: 300,
                    // marginEnd: 380 * 0.7
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    flex: 4,
                    minWidth: 400,
                    position: 'relative',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* <Image
                    source={require('../assets/delivery_guy.svg')}
                    style={{
                      height: 200,
                      width: 200,
                      // marginEnd: 380 * 0.7
                    }}
                    resizeMode="contain"
                  />
                  <Image
                    source={require('../assets/delivery_truck.svg')}
                    style={{
                      height: 200,
                      width: 200,
                      // marginEnd: 380 * 0.7
                    }}
                    resizeMode="contain"
                  /> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  top: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    position: 'relative',
  },

  navLink: {
    color: ACCENT,
    marginEnd: 30,
    fontSize: 27,
    fontWeight: '500',
    textShadow: '1px 1px 0px #fff, 2px 2px 0px #a35c8a',
  },
  locationInputCOntainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    boxShadow: 'rgb(224, 201, 216) 1px 2px 8px -2px',
    padding: 20,
    zIndex: 1000,
    position: 'relative',
    maxWidth: 600,
  },
})
