import React, { FC, useCallback } from 'react'
import { Decoration } from 'react-diff-view'
import { Styled } from './styled'

type TExpandButtonProps = {
  direction: string
  start: number
  lines: number
  onExpand: (a: number, b: number) => void
}

export const ExpandButton: FC<TExpandButtonProps> = ({ direction, start, lines, onExpand }) => {
  const click = useCallback(() => {
    if (direction === 'up') {
      onExpand(start - 10, start - 1)
    } else {
      onExpand(start + lines, start + lines + 9)
    }
  }, [direction, start, lines, onExpand])

  return (
    <Decoration>
      <Styled.ExpandButton onClick={click}>{direction === 'up' ? 'Expand Up' : 'Expand Down'}</Styled.ExpandButton>
    </Decoration>
  )
}
