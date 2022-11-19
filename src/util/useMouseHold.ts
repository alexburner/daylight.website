import { useCallback, useEffect, useRef, useState } from 'react'
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
  const callbackRef = useRef(callback)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const onMouseDown = useCallback(() => setIsMouseDown(true), [])
  const onMouseUp = useCallback(() => setIsMouseDown(false), [])

  // Initial callback
  useEffect(() => {
    if (isMouseDown) callbackRef.current()
  }, [isMouseDown])

  // Repeated callbacks
  useInterval(callbackRef.current, isMouseDown ? delay : null)

  return {
    onMouseDown,
    onMouseUp,
    onTouchStart: onMouseDown,
    onTouchEnd: onMouseUp,
  }
}
