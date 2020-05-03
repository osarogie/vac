import React, { useEffect, useState, useRef } from 'react'
import { Select } from 'antd'
import { View } from 'react-native'

const defaultAutocompletionRequest = {
  //   types: ['(cities)'],
  componentRestrictions: {
    country: 'NG',
  },
}

export function SelectPlaces({
  placeholder = 'e.g. 18 Adeola Odeku',
  value: initialValue,
  onChange,
  multi,
  simpleValue,
  autocompletionRequest = defaultAutocompletionRequest,
  style,
}) {
  const [value, setValue] = useState(initialValue)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const selectPlacesNode = useRef()
  const placesService = useRef()
  const autocompleteService = useRef()

  useEffect(() => {
    mapValueToState({ value })
  }, [initialValue])

  const mapValueToState = async (props) => {
    const retrieveValue = async (props) => {
      let value

      if (props.value && props.value.placeId) {
        try {
          value = await new Promise((resolve, reject) => {
            if (!placesService.current && window.google && window.google.maps) {
              placesService.current = new window.google.maps.places.PlacesService(
                selectPlacesNode.current
              )
            }

            placesService.current.getDetails(
              { placeId: props.value.placeId },
              (placeInfo, requestStatus) => {
                if (requestStatus === 'OK') {
                  resolve({ label: placeInfo.formatted_address })
                } else if (props.value.label) {
                  console.warn(
                    `Google Maps Places API RequestStatus is: ${requestStatus}, label property is used`
                  )
                  resolve({ label: props.value.label })
                } else {
                  reject()
                  console.warn(
                    `Google Maps Places API RequestStatus is: ${requestStatus} and label property is missing`
                  )
                }
              }
            )
          })
        } catch (e) {
          console.warn('Google Maps Places is not loaded', e)
          value = props.value.label && { label: props.value.label }
        }
      } else {
        if (typeof props.value === 'string') {
          value = { label: props.value }
        } else {
          value = props.value &&
            props.value.label && { label: props.value.label }
        }
      }
      return value
    }

    if (props.multi) {
      let multiValue = []
      props.value.forEach(async (place) => {
        multiValue.push(await retrieveValue({ value: place }))
      })
      setValue(await multiValue)
    } else {
      setValue(await retrieveValue(props))
    }
  }

  const loadOptions = (input) => {
    if (input) {
      if (!autocompleteService.current && window.google && window.google.maps) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService()
      }

      if (autocompleteService.current) {
        setLoading(true)
        autocompleteService.current.getPlacePredictions(
          { ...autocompletionRequest, input },
          (predictions) => {
            let options = []
            if (predictions) {
              options = predictions.map((prediction) => ({
                label: prediction.description,
                ...prediction,
              }))
            }

            setOptions(options)
            setLoading(false)
          }
        )
      } else {
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }

  const handleChange = (newValue) => {
    const removing = multi && value && value.length > newValue.length
    const place = options.find((o) =>
      o.id === multi ? newValue[newValue.length - 1] : newValue
    )

    if (place && place.place_id && onChange && !simpleValue && !removing) {
      onChange(null)
      if (!placesService.current) {
        placesService.current = new window.google.maps.places.PlacesService(
          selectPlacesNode.current
        )
      }
      placesService.current.getDetails(
        { placeId: place.place_id },
        (placeInfo) => {
          setValue(newValue)
          onChange(placeInfo)
        }
      )
    } else {
      setValue(simpleValue ? newValue && { label: newValue } : newValue)
      onChange && onChange(newValue)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Select
        size="large"
        showSearch
        loading={loading}
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        // showArrow={false}
        filterOption={false}
        onSearch={loadOptions}
        onChange={handleChange}
        notFoundContent={null}
      >
        {options.map(({ id, label }) => (
          <Select.Option key={id}>{label}</Select.Option>
        ))}
      </Select>
      <div ref={selectPlacesNode} />
    </View>
  )
}

// const place = {
//   description: '35 Marina Road, Lagos, Nigeria',
//   id: '89a8340805bf63999c3a5b0bcbce36148a22c150',
//   matched_substrings: [
//     {
//       length: 2,
//       offset: 0,
//     },
//   ],
//   place_id: 'ChIJkQ8utg-LOxARLmjfx6ddOJU',
//   reference: 'ChIJkQ8utg-LOxARLmjfx6ddOJU',
//   structured_formatting: {
//     main_text: '35 Marina Road',
//     main_text_matched_substrings: [
//       {
//         length: 2,
//         offset: 0,
//       },
//     ],
//     secondary_text: 'Lagos, Nigeria',
//   },
//   terms: [
//     {
//       offset: 0,
//       value: '35',
//     },
//     {
//       offset: 3,
//       value: 'Marina Road',
//     },
//     {
//       offset: 16,
//       value: 'Lagos',
//     },
//     {
//       offset: 23,
//       value: 'Nigeria',
//     },
//   ],
//   types: ['street_address', 'geocode'],
// }
