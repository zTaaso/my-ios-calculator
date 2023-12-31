import { Colors } from '@/Constants'
import React, { useMemo } from 'react'

import type { TouchableHighlightProps } from 'react-native'

import * as S from './styles'

export interface CalcButtonPROPS extends TouchableHighlightProps {
  type: 'number' | 'operation' | 'special'
  text: string
  textColor?: string
  isZero?: boolean
  isActive?: boolean
}

const CalcButton: React.FC<CalcButtonPROPS> = ({ ...props }) => {
  const underlayColor = useMemo(() => {
    if (props.type === 'operation') return Colors.accentPressed
    if (props.type === 'special') return Colors.grayPressed
    if (props.type === 'number') return Colors.secondaryPressed
  }, [props.type])

  return (
    <S.Button
      underlayColor={underlayColor}
      delayPressIn={0}
      delayPressOut={0}
      activeOpacity={1}
      {...props}
    >
      <S.StyledText color={props.textColor} isActive={props.isActive}>
        {props.text}
      </S.StyledText>
    </S.Button>
  )
}

export default React.memo(CalcButton)
