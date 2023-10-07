import styled, { css } from 'styled-components/native'
import { TouchableHighlight } from 'react-native'
import type { CalcButtonPROPS } from '.'
import { Colors } from '@/Constants'
import { Metrics } from '@/Constants/metrics'
import { Text } from 'native-base'

const doubledButtonSize = 195 // buttonSize * 2 + horizontal margin sizes

export const Button = styled(TouchableHighlight)<CalcButtonPROPS>`
  width: ${({ isZero }) => (isZero ? doubledButtonSize : Metrics.buttonSize)}px;
  height: ${Metrics.buttonSize}px;
  border-radius: ${Metrics.buttonSize / 2}px;
  background-color: ${Colors.secondary};
  justify-content: center;

  ${({ type }) =>
    type === 'operation' &&
    css`
      background-color: ${Colors.accent};
    `};

  ${({ type }) =>
    type === 'special' &&
    css`
      background-color: ${Colors.gray};
    `};
`

export const StyledText = styled(Text)<{ color?: string }>`
  text-align: center;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  color: ${({ color }) => color ?? Colors.white};
`
