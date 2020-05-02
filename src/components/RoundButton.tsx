import * as React from 'react'
import { Button } from 'react-native-paper'
import { Text } from 'react-native'

interface RoundButtonProps {
  [s: string]: any
}

export function RoundButton(buttonProps: RoundButtonProps) {
  const { children, style, textStyle, ...props } = buttonProps

  return (
    <Button
      mode="contained"
      contentStyle={{ height: 50 }}
      style={[styles.button, style]}
      {...props}
    >
      <Text
        style={[
          {
            fontWeight: 'bold',
            fontFamily: 'Livvic',
            color: 'white',
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Button>
  )
}

const styles = {
  button: {
    width: 157,
    borderRadius: 25,
    zIndex: 200,
  },
}
