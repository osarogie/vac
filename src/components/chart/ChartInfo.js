import { View, Text } from 'react-native'

export function ChartInfo({ count, percentage, label }) {
  return (
    <View
      style={{
        width: 173,
        height: 179,
        borderRadius: 25,
        backgroundColor: '#fefbf5',
        paddingHorizontal: 22,
        paddingVertical: 34,
        marginTop: 20,
        marginRight: 20,
      }}
    >
      <Text
        style={{
          backgroundColor: '#a3a866',
          height: 51,
          width: 51,
          borderRadius: 32,
          marginBottom: 14,
          fontFamily: 'Livvic',
          fontSize: 23,
          fontWeight: '600',
          lineHeight: 51,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        {count}
      </Text>
      <Text
        style={{
          fontFamily: 'Livvic',
          fontSize: 23,
          fontWeight: '600',
          fontStyle: 'normal',
          color: '#231f32',
        }}
      >
        {percentage}
      </Text>
      <Text
        style={{
          fontFamily: 'Livvic',
          fontSize: 14,
          fontWeight: 'normal',
          fontStyle: 'normal',

          color: '#807d98',
        }}
      >
        {label}
      </Text>
    </View>
  )
}
