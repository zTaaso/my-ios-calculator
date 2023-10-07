import React from 'react'
import { Factory, Text, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalcButton } from '@/Components'

import type { CalcButtonPROPS } from '@/Components/CalcButton'

import * as S from './styles'
import { Colors } from '@/Constants'

const FactorySafeArea = Factory(SafeAreaView)

const rows: CalcButtonPROPS[][] = [
  [
    { text: 'AC', type: 'special', onPress: () => {}, textColor: Colors.black },
    {
      text: '+/-',
      type: 'special',
      onPress: () => {},
      textColor: Colors.black,
    },
    { text: '%', type: 'special', onPress: () => {}, textColor: Colors.black },
    { text: '÷', type: 'operation', onPress: () => {} },
  ],
  [
    { text: '7', type: 'number', onPress: () => {} },
    { text: '8', type: 'number', onPress: () => {} },
    { text: '9', type: 'number', onPress: () => {} },
    { text: '×', type: 'operation', onPress: () => {} },
  ],
  [
    { text: '4', type: 'number', onPress: () => {} },
    { text: '5', type: 'number', onPress: () => {} },
    { text: '6', type: 'number', onPress: () => {} },
    { text: '-', type: 'operation', onPress: () => {} },
  ],
  [
    { text: '1', type: 'number', onPress: () => {} },
    { text: '2', type: 'number', onPress: () => {} },
    { text: '3', type: 'number', onPress: () => {} },
    { text: '+', type: 'operation', onPress: () => {} },
  ],
  [
    { text: '0', type: 'number', onPress: () => {}, isZero: true },
    { text: '.', type: 'number', onPress: () => {} },
    { text: '=', type: 'operation', onPress: () => {} },
  ],
]

const MainCalculator: React.FC = () => {
  return (
    <FactorySafeArea flex={1} bg={Colors.black}>
      <View
        flex={0.4}
        pr={5}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
      >
        <Text fontSize={100}>0</Text>
      </View>
      <View flex={0.6} justifyContent={'flex-end'} mb={5}>
        {rows.map((row, i) => (
          <S.Row key={i}>
            {row.map(btnProps => (
              <CalcButton {...btnProps} key={btnProps.text} />
            ))}
          </S.Row>
        ))}
      </View>
    </FactorySafeArea>
  )
}

export default MainCalculator
