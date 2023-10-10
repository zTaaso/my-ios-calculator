import { OperationSymbols } from '@/Constants'
import { formatResult, getNumberResult } from '@/Helpers'
import { useCallback, useState } from 'react'

const MAX_LENGTH = 11

let lastOperation = ''
let lastValue = 0

export const useCalculations = () => {
  const [display, setDisplay] = useState('0')
  const [currOperation, setCurrOperation] = useState('')

  const handleAddDot = useCallback(() => {
    if (display.includes('.')) return

    setDisplay(prevDisplay => `${prevDisplay}.`)
  }, [display])

  const concatDigit = useCallback(
    (digit: string) => {
      const isOperating = currOperation !== ''

      if (display.length >= MAX_LENGTH && !isOperating) return

      setCurrOperation('')

      const shouldConcat = display !== '0' && !isOperating

      if (shouldConcat) {
        setDisplay(prevDisplay => formatResult(prevDisplay + digit))
        return
      }

      lastValue = getNumberResult(display)
      setDisplay(digit)
    },
    [display, currOperation],
  )

  const clearValue = useCallback(() => {
    lastValue = 0
    setDisplay('0')
    setCurrOperation('')
    lastOperation = ''
  }, [])

  const handleCalculate = useCallback(() => {
    if (lastValue === 0) return

    const displayedValue = Number(display)

    let result = 0

    if (lastOperation === OperationSymbols.sum) {
      result = displayedValue + lastValue
    }

    if (lastOperation === OperationSymbols.multiplication) {
      result = displayedValue * lastValue
    }

    if (lastOperation === OperationSymbols.division) {
      result = lastValue / displayedValue
    }

    if (lastOperation === OperationSymbols.subtraction) {
      result = lastValue - displayedValue
    }

    setDisplay(formatResult(result))
    lastValue = result

    lastOperation = ''
  }, [display])

  const activateOperation = useCallback(
    (operation: string) => {
      if (operation === OperationSymbols.inversion) {
        const displayedValue = -Number(display)
        setDisplay(String(displayedValue))
        return
      }

      if (operation === OperationSymbols.percentage) {
        const displayedValue = Number(display) / 100
        setDisplay(String(displayedValue))
        return
      }

      if (lastOperation === operation) {
        handleCalculate()
      }

      setCurrOperation(operation)
      lastOperation = operation
    },
    [handleCalculate, display],
  )

  return {
    display,
    currOperation,
    concatDigit,
    clearValue,
    activateOperation,
    handleCalculate,
    handleAddDot,
  }
}
