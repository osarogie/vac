import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native'
import { ACCENT } from '../styles/colors'
import { CustomHead } from '../components/CustomHead'
import { Logo } from '../components/Logo'
import { useWindowDimensions } from '../lib/useWindowDimensions'
import { SelectPlaces } from '../components/SelectPlaces'
import { Button, Modal } from 'antd'
import { useState, useCallback } from 'react'

const year = new Date().getFullYear()

function BigScreenOnly({ children }) {
  const { width } = useWindowDimensions()

  if (width < 400) return null

  return children
}

function FormItem({ label, style, children }) {
  return (
    <View style={style}>
      <Text style={{ color: ACCENT, fontSize: 20, marginBottom: 10 }}>
        {label}
      </Text>
      {children}
    </View>
  )
}

export default function Index() {
  const [pickupLocation, setPickupLocation] = useState()
  const [deliveryLocation, setDeliveryLocation] = useState()
  const [modalVisible, setModalVisible] = useState(false)

  const { width } = useWindowDimensions()
  const paddingHorizontal = width < 500 ? 20 : 50

  const openModal = useCallback(() => {
    setModalVisible(true)
  })

  const closeModal = useCallback(() => {
    setModalVisible(false)
  })

  return (
    <>
      <CustomHead title="VAC Logistics" />
      <ImageBackground
        style={{ backgroundColor: '#fff', flex: 1, position: 'relative' }}
      >
        <Image
          source={require('../assets/green_petal.svg')}
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
            <View style={[styles.top, { paddingHorizontal }]}>
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
                    We are committed to handling your deliveries with
                    efficiency. We are fast, easy and reliable
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
                    <View style={styles.row}>
                      <FormItem
                        label="Pickup From"
                        style={{ flex: 1, minWidth: 200, margin: 10 }}
                      >
                        <SelectPlaces onChange={setPickupLocation} />
                      </FormItem>
                      <FormItem
                        label="Deliver To"
                        style={{ flex: 1, minWidth: 200, margin: 10 }}
                      >
                        <SelectPlaces
                          onChange={setDeliveryLocation}
                          placeholder="e.g. 47 Coker Road"
                        />
                      </FormItem>
                    </View>
                    <Button
                      size="large"
                      onClick={openModal}
                      //   disabled={!pickupLocation || !deliveryLocation}
                      style={{ margin: 10, width: 150 }}
                    >
                      Make Request
                    </Button>
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
            <View
              style={{
                padding: 20,
                alignSelf: 'flex-end',
                fontFamily: 'Livvic',
                opacity: 0.6,
              }}
            >
              <Text>VAC Logistics &copy; {year}</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal
        centered
        footer={null}
        destroyOnClose
        visible={modalVisible}
        onCancel={closeModal}
      >
        <View style={{ padding: 20 }}></View>
      </Modal>
    </>
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
    textShadow: '1px 1px 0px #fff',
  },
  locationInputCOntainer: {
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    boxShadow: 'rgb(224, 201, 216) 1px 2px 8px -2px',
    padding: 10,
    zIndex: 1000,
    position: 'relative',
    maxWidth: 600,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
