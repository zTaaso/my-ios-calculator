import styled, { css } from 'styled-components/native'
import { TouchableHighlight } from 'react-native'
import type { CalcButtonPROPS } from '.'
import { Colors, Metrics } from '@/Constants'

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

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${Colors.white};
    `};
`

export const StyledText = styled(Text)<{ isActive?: boolean }>`
  text-align: center;
  font-size: 40px;
  line-height: 60px;
  text-align: center;
  color: ${({ color, isActive }) =>
    isActive ? Colors.accent : color ?? Colors.white};
`
