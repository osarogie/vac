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
import { Button, Modal, Timeline, Form } from 'antd'
import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Feather from 'react-native-vector-icons/Feather'

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
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  const clearState = useCallback(() => {
    setDeliveryLocation(null)
    setPickupLocation(null)
  }, [])

  return (
    <>
      <CustomHead title="VAC Logistics" />
      <ImageBackground
        style={{ backgroundColor: '#fff', flex: 1, position: 'relative' }}
      >
        <ScrollView style={{ flex: 1, position: 'relative' }}>
          <View
            style={{
              position: 'relative',
            }}
          >
            <Image
              source={require('../assets/petal_outline.svg')}
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
            <View style={[styles.top, { paddingHorizontal }]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 50,
                }}
              >
                <Logo size={150} />

                <View style={{ flex: 1 }} />

                <Text
                  accessibilityRole="link"
                  href="tel://+2348125583089"
                  style={styles.navLink}
                >
                  <Feather name="phone" size={30} color={ACCENT} />
                  +234 812 558 3089
                </Text>

                {/* <BigScreenOnly>
                  <Text accessibilityRole="link" style={styles.navLink}>
                    Service
                  </Text>
                  <Text accessibilityRole="link" style={styles.navLink}>
                    Pricing
                  </Text>
                  <Text accessibilityRole="link" style={styles.navLink}>
                    About Us
                  </Text>
                </BigScreenOnly> */}
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
                      disabled={!pickupLocation || !deliveryLocation}
                      style={{ margin: 10, width: 150 }}
                    >
                      Continue
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
        <RequestForm
          pickupLocation={pickupLocation}
          deliveryLocation={deliveryLocation}
          onFinish={clearState}
        />
      </Modal>
    </>
  )
}

function RequestForm({ pickupLocation, deliveryLocation, onFinish }) {
  const placesService = useRef()
  const [distance, setDistance] = useState()
  const [time, setTime] = useState()
  const price = useMemo(() => {
    return (Number(time?.value) * 0.05 + Number(distance?.value) * 0.15) | 0
  }, [time, distance])

  useEffect(() => {
    if (!placesService.current) {
      placesService.current = new window.google.maps.DistanceMatrixService()
    }

    if (!pickupLocation || !deliveryLocation) return

    placesService.current.getDistanceMatrix(
      {
        origins: [pickupLocation?.formatted_address],
        destinations: [deliveryLocation?.formatted_address],
        avoidTolls: true,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        setTime(response?.rows[0]?.elements[0]?.duration)
        setDistance(response?.rows[0]?.elements[0]?.distance)
      }
    )
  }, [pickupLocation, deliveryLocation])

  const makeRequest = useCallback(() => {
    if (!placesService.current) {
      placesService.current = new window.google.maps.places.PlacesService(
        selectPlacesNode.current
      )
    }

    placesService.current
  })

  return (
    <View style={{ padding: 20 }}>
      <Timeline>
        <Timeline.Item color="green">
          {pickupLocation?.formatted_address}
        </Timeline.Item>
        <Timeline.Item color="red">
          {deliveryLocation?.formatted_address}
        </Timeline.Item>
      </Timeline>

      <View style={{ marginBottom: 50 }}>
        <InfoItem label="PRICE (EST)" value={`NGN${price}`} />
        <InfoItem label="DISTANCE (EST)" value={distance?.text} />
        <InfoItem label="TIME (EST)" value={time?.text} />
      </View>

      <Form onFinish={makeRequest}>
        <Button size="large" style={{ width: 150 }}>
          Make Request
        </Button>
      </Form>
    </View>
  )
}

function InfoItem({ label, value }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 17, fontFamily: 'Livvic' }}>{label}</Text>

      <View style={{ flex: 1 }} />
      <Text style={{ fontSize: 17, fontFamily: 'Livvic' }}>{value}</Text>
    </View>
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
