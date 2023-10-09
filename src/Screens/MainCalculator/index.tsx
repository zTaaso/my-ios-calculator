import React, { useCallback, useMemo } from 'react'
import { Factory, Text, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalcButton } from '@/Components'

import type { CalcButtonPROPS } from '@/Components/CalcButton'

import * as S from './styles'
import { Colors, OperationSymbols } from '@/Constants'
import { useCalculations } from '@/Hooks'

const FactorySafeArea = Factory(SafeAreaView)

interface CalculationFunctions {
  concat: (digit: string) => void
  addDot: () => void
  clear: () => void
  operation: (operation: string) => void
  calculate: () => void
}

interface ROW extends CalcButtonPROPS {
  fn: keyof CalculationFunctions
}

const MainCalculator: React.FC = () => {
  const {
    display,
    currOperation,
    concatDigit,
    clearValue,
    activateOperation,
    handleCalculate,
    handleAddDot,
  } = useCalculations()

  const displaySize = useMemo(
    () => (display.length > 5 ? 100 - display.length * 3 : 100),
    [display.length],
  )

  const isActive = useCallback(
    (op: string) => currOperation === op,
    [currOperation],
  )

  const calculation: CalculationFunctions = useMemo(
    () => ({
      concat: (digit: string) => concatDigit(digit),
      addDot: handleAddDot,
      clear: clearValue,
      operation: (operation: string) => activateOperation(operation),
      calculate: handleCalculate,
    }),
    [clearValue, concatDigit, activateOperation, handleCalculate, handleAddDot],
  )

  const handlePress = useCallback(
    (fn: keyof CalculationFunctions, digit: string) => {
      calculation[fn](digit)
    },
    [calculation],
  )

  const rows: ROW[][] = useMemo(
    () => [
      [
        {
          text: 'AC',
          type: 'special',
          fn: 'clear',
          textColor: Colors.black,
        },
        {
          text: OperationSymbols.inversion,
          type: 'special',
          fn: 'operation',
          textColor: Colors.black,
        },
        {
          text: '%',
          type: 'special',
          fn: 'operation',
          textColor: Colors.black,
        },
        {
          text: OperationSymbols.division,
          type: 'operation',
          fn: 'operation',
          isActive: isActive(OperationSymbols.division),
        },
      ],
      [
        { text: '7', type: 'number', fn: 'concat' },
        { text: '8', type: 'number', fn: 'concat' },
        { text: '9', type: 'number', fn: 'concat' },
        {
          text: OperationSymbols.multiplication,
          type: 'operation',
          fn: 'operation',
          isActive: isActive(OperationSymbols.multiplication),
        },
      ],
      [
        { text: '4', type: 'number', fn: 'concat' },
        { text: '5', type: 'number', fn: 'concat' },
        { text: '6', type: 'number', fn: 'concat' },
        {
          text: OperationSymbols.subtraction,
          type: 'operation',
          fn: 'operation',
          isActive: isActive(OperationSymbols.subtraction),
        },
      ],
      [
        { text: '1', type: 'number', fn: 'concat' },
        { text: '2', type: 'number', fn: 'concat' },
        { text: '3', type: 'number', fn: 'concat' },
        {
          text: OperationSymbols.sum,
          type: 'operation',
          fn: 'operation',
          isActive: isActive(OperationSymbols.sum),
        },
      ],
      [
        { text: '0', type: 'number', fn: 'concat', isZero: true },
        { text: '.', type: 'number', fn: 'addDot' },
        { text: OperationSymbols.equals, type: 'operation', fn: 'calculate' },
      ],
    ],
    [isActive],
  )

  return (
    <FactorySafeArea flex={1} bg={Colors.black}>
      <View
        flex={0.4}
        pr={5}
        justifyContent={'flex-end'}
        alignItems={'flex-end'}
        mb={20}
      >
        <Text fontSize={displaySize}>{display}</Text>
      </View>
      <View flex={0.6} justifyContent={'flex-end'} mb={5}>
        {rows.map((row, i) => (
          <S.Row key={i}>
            {row.map(btnProps => (
              <CalcButton
                {...btnProps}
                key={btnProps.text}
                onPress={() => handlePress(btnProps.fn, btnProps.text)}
              />
            ))}
          </S.Row>
        ))}
      </View>
    </FactorySafeArea>
  )
}

export default MainCalculator
