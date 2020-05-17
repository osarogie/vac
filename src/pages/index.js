import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native"
import { ACCENT } from "../styles/colors"
import { CustomHead } from "../components/CustomHead"
import { Logo } from "../components/Logo"
import { useWindowDimensions } from "../lib/useWindowDimensions"
import { SelectPlaces } from "../components/SelectPlaces"
import { Button, Modal, Timeline, Form, Input, notification } from "antd"
import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import Feather from "react-native-vector-icons/Feather"
import { useViewer, useLocalViewer } from "../hooks/useViewer"
import { useForm } from "antd/lib/form/util"

const year = new Date().getFullYear()
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT

const inputRules = [{ required: true, message: "This field is required" }]
const nameInputRules = [...inputRules]
const phoneInputRules = [...inputRules]

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

const makeOrderMutation = `
  mutation makeOrder($input: makeOrderInput!) {
    makeOrder(input: $input) {
      status
      message
      order {
        rrn
      }
    }
  }
`

async function executeQuery(query, variables) {
  return new Promise(resolve => {
    fetch(GRAPHQL_ENDPOINT || "https://vacoffice.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    })
      .then(response => response.json())
      .then(resolve)
      .catch(err => {
        console.error(err)
        resolve({ data: null, errors: [err] })
      })
  })
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

  const onOrder = useCallback(order => {
    notification.success({
      message: "Great!",
      description: "Your order was successful",
    })
    setDeliveryLocation(null)
    setPickupLocation(null)
    closeModal()
  }, [])

  return (
    <>
      <CustomHead title="VAC Logistics" />
      <ImageBackground
        style={{ backgroundColor: "#fff", flex: 1, position: "relative" }}
      >
        <ScrollView style={{ flex: 1, position: "relative" }}>
          <View
            style={{
              position: "relative",
            }}
          >
            <Image
              source={require("../assets/petal_outline.svg")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                right: -50,
                top: -50,
              }}
            />

            <Image
              source={require("../assets/petal.svg")}
              style={{
                width: 200,
                height: 200,
                position: "absolute",
                left: -50,
                bottom: -50,
              }}
            />
            <View style={[styles.top, { paddingHorizontal }]}>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 50,
                }}
              >
                <Logo size={100} />

                <View style={{ flex: 1 }} />

                <Text
                  accessibilityRole="link"
                  href="tel://+2348125583089"
                  style={styles.navLink}
                >
                  <Feather name="phone" size={20} color={ACCENT} />
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

              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ flex: 3 }}>
                  <Text
                    style={{
                      fontSize: 67 * 0.7,
                      color: ACCENT,
                      fontFamily: "Livvic",
                      fontWeight: "bold",
                    }}
                  >
                    Delivery Services
                  </Text>
                  <Text
                    style={{
                      fontSize: 27 * 0.7,
                      color: "#927d8a",
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
                  <View style={styles.locationInputContainer}>
                    <View style={styles.row}>
                      <FormItem
                        label="Pickup From"
                        style={{ flex: 1, minWidth: 250, margin: 10 }}
                      >
                        <SelectPlaces
                          onChange={setPickupLocation}
                          value={pickupLocation}
                        />
                      </FormItem>
                      <FormItem
                        label="Deliver To"
                        style={{ flex: 1, minWidth: 250, margin: 10 }}
                      >
                        <SelectPlaces
                          onChange={setDeliveryLocation}
                          value={deliveryLocation}
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
                  style={{ marginTop: -60, position: "relative", zIndex: -1 }}
                >
                  <Image
                    source={require("../assets/clouds.svg")}
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
                      position: "relative",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      flexWrap: "wrap",
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
                alignSelf: "flex-end",
                fontFamily: "Livvic",
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
          onFinish={onOrder}
        />
      </Modal>
    </>
  )
}

function RequestForm({ pickupLocation, deliveryLocation, onFinish }) {
  const { viewer } = useViewer()
  const [localViewer, setLocalViewer] = useLocalViewer()
  const [form] = useForm()

  const defaultSenderName = viewer?.fullName || localViewer?.fullName
  const defaultSenderPhone = viewer?.phoneNumber || localViewer?.phoneNumber

  const placesService = useRef()
  const [distance, setDistance] = useState()
  const [processing, setProcessing] = useState(false)
  const [time, setTime] = useState()
  const amount = useMemo(() => {
    const value = time?.value * 0.05 + distance?.value * 0.1
    return Math.max(100 * Math.ceil(value / 100), 500)
  }, [time, distance])

  useEffect(() => {
    if (!window.google?.maps || !pickupLocation || !deliveryLocation) return

    if (!placesService.current) {
      placesService.current = new window.google.maps.DistanceMatrixService()
    }

    placesService.current.getDistanceMatrix(
      {
        origins: [pickupLocation?.formatted_address],
        destinations: [deliveryLocation?.formatted_address],
        avoidTolls: true,
        travelMode: "DRIVING",
      },
      (response, status) => {
        setTime(response?.rows[0]?.elements[0]?.duration)
        setDistance(response?.rows[0]?.elements[0]?.distance)
      }
    )
  }, [pickupLocation, deliveryLocation])

  const makeRequest = useCallback(
    async ({
      name,
      senderPhone,
      recipientPhone,
      recipientName,
      senderName,
    }) => {
      const variables = {
        input: {
          name,
          senderPhone,
          recipientPhone,
          recipientName,
          senderName,
          amount,
          pickupAddress: pickupLocation?.formatted_address,
          deliveryAddress: deliveryLocation?.formatted_address,
        },
      }

      setProcessing(true)
      const { data, errors } = await executeQuery(makeOrderMutation, variables)
      setProcessing(false)

      if (data?.makeOrder?.status) {
        onFinish(data?.makeOrder?.order)
      } else if (data?.makeOrder?.message) {
        notification.error({
          key: "API",
          message: "Oops",
          description: data?.makeOrder?.message,
        })
      } else if (errors) {
        for (const error of errors) {
          notification.error({
            message: "Oops",
            description: error?.message,
          })
        }
      }

      setLocalViewer({
        fullName: senderName,
        phoneNumber: senderPhone,
      })
    },
    [pickupLocation, deliveryLocation, onFinish, amount]
  )

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

      <View style={{ marginBottom: 20 }}>
        <InfoItem label="PRICE (EST)" value={`NGN${amount}`} />
        <InfoItem label="DISTANCE (EST)" value={distance?.text} />
        <InfoItem label="TIME (EST)" value={time?.text} />
      </View>

      <Form
        name="order-form"
        size="large"
        layout="vertical"
        onFinish={makeRequest}
        form={form}
        initialValues={{
          senderPhone: defaultSenderPhone,
          senderName: defaultSenderName,
        }}
      >
        <Form.Item
          name="name"
          label="What you want delivered"
          rules={inputRules}
        >
          <Input placeholder="e.g. A bag" />
        </Form.Item>

        <View style={styles.inputGroup}>
          <View style={styles.inputCont}>
            <Form.Item
              name="senderName"
              label="Your name"
              rules={nameInputRules}
            >
              <Input />
            </Form.Item>
          </View>

          <View style={styles.inputCont}>
            <Form.Item
              name="senderPhone"
              label="Your phone number"
              rules={phoneInputRules}
            >
              <Input placeholder="e.g. 08123456789" />
            </Form.Item>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputCont}>
            <Form.Item
              name="recipientName"
              label="Recipients name"
              rules={nameInputRules}
            >
              <Input />
            </Form.Item>
          </View>

          <View style={styles.inputCont}>
            <Form.Item
              name="recipientPhone"
              label="Recipients phone number"
              rules={phoneInputRules}
            >
              <Input placeholder="e.g. 08123456789" />
            </Form.Item>
          </View>
        </View>

        <Button
          disabled={processing || !amount}
          loading={processing}
          style={{ width: 150 }}
          htmlType="submit"
        >
          Make Request
        </Button>
      </Form>
    </View>
  )
}

function InfoItem({ label, value }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 17, fontFamily: "Livvic" }}>{label}</Text>

      <View style={{ flex: 1 }} />
      <Text style={{ fontSize: 17, fontFamily: "Livvic" }}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    position: "relative",
  },
  navLink: {
    color: ACCENT,
    marginEnd: 30,
    fontSize: 20,
    fontWeight: "500",
    textShadow: "1px 1px 0px #fff",
  },
  locationInputContainer: {
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 6,
    boxShadow: "rgb(224, 201, 216) 1px 2px 8px -2px",
    padding: 10,
    zIndex: 1000,
    position: "relative",
    maxWidth: 600,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputCont: { flex: 1, minWidth: 150, marginHorizontal: 10 },
  inputGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -10,
  },
})
