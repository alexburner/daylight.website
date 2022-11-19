import { useCallback, useState } from 'react'
import { useInterval } from 'react-use'

export const useMouseHold = (
  callback: () => void,
  delay = 100,
): {
  onMouseDown: () => void
  onMouseUp: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
} => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const onMouseDown = useCallback(() => setIsMouseDown(true), [])
  const onMouseUp = useCallback(() => setIsMouseDown(false), [])

  useInterval(callback, isMouseDown ? delay : null)

  return {
    onMouseDown,
    onMouseUp,
    onTouchStart: onMouseDown,
    onTouchEnd: onMouseUp,
  }
}
