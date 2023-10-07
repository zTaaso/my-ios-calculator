import React from 'react'
import { NativeBaseProvider, extendTheme, StatusBar } from 'native-base'

import { LogBox } from 'react-native'
import { MainCalculator } from '@/Screens'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ config })

type MyThemeType = typeof theme
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const App: React.FC = () => {
  LogBox.ignoreLogs(['SSRProvider'])

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle={'light-content'} />
      <MainCalculator />
    </NativeBaseProvider>
  )
}

export default App
