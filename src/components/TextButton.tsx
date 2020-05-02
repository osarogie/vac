import * as React from 'react'
import { Button } from 'react-native-paper'
import { Text } from 'react-native'

interface TextButtonProps {
  [s: string]: any
}

export function TextButton(buttonProps: TextButtonProps) {
  const { children, style, textStyle, ...props } = buttonProps

  return (
    <Button
      mode="text"
      contentStyle={{ height: 50 }}
      style={[styles.button, style]}
      {...props}
    >
      <Text
        style={[
          {
            fontWeight: 'bold',
            fontFamily: 'Livvic',
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
    marginEnd: 20,
    borderRadius: 25,
    zIndex: 200,
  },
}
