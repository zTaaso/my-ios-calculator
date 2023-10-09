import { OperationSymbols } from '@/Constants'
import { formatResult } from '@/Helpers'
import { useCallback, useState } from 'react'

let lastOperation = ''

export const useCalculations = () => {
  const [value, setValue] = useState(0)
  const [display, setDisplay] = useState('0')
  const [currOperation, setCurrOperation] = useState('')

  const handleAddDot = useCallback(() => {
    if (display.includes('.')) return

    setDisplay(prevDisplay => `${prevDisplay}.`)
  }, [display])

  const concatDigit = useCallback(
    (digit: string) => {
      if (display.length === 9) return
      const isOperating = currOperation !== ''

      setCurrOperation('')

      const shouldConcat = display !== '0' && !isOperating

      if (shouldConcat) {
        setDisplay(prevDisplay => prevDisplay + digit)
        !lastOperation && setValue(Number(display + digit))
        return
      }

      !lastOperation && setValue(Number(display))
      setDisplay(digit)
    },
    [display, currOperation],
  )

  const clearValue = useCallback(() => {
    setValue(0)
    setDisplay('0')
    setCurrOperation('')
    lastOperation = ''
  }, [])

  const handleCalculate = useCallback(() => {
    const displayedValue = Number(display)

    let result = 0

    if (lastOperation === OperationSymbols.sum) {
      result = displayedValue + value
    }

    if (lastOperation === OperationSymbols.multiplication) {
      result = displayedValue * value
    }

    if (lastOperation === OperationSymbols.division) {
      result = value / displayedValue
    }

    if (lastOperation === OperationSymbols.subtraction) {
      result = value - displayedValue
    }

    setDisplay(formatResult(result))
    setValue(result)

    lastOperation = ''
  }, [display, value])

  const activateOperation = useCallback(
    (operation: string) => {
      if (operation === OperationSymbols.inversion) {
        const displayedValue = -Number(display)
        setDisplay(String(displayedValue))
        setValue(displayedValue)
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
