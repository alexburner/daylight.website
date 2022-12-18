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
  const [isHolding, setIsHolding] = useState(false)

  // This is in case we're on iOS,
  // which fires touch AND mouse events
  // causing double hold responses
  //
  // Touch is first
  // So we ignore mouse
  const heardTouch = useRef(false)

  const onTouchStart = useCallback(() => {
    heardTouch.current = true
    setIsHolding(true)
  }, [])
  const onTouchEnd = useCallback(() => {
    heardTouch.current = true
    setIsHolding(false)
  }, [])

  const onMouseDown = useCallback(() => {
    if (heardTouch.current) return
    setIsHolding(true)
  }, [])
  const onMouseUp = useCallback(() => {
    if (heardTouch.current) return
    setIsHolding(false)
  }, [])

  // Leading edge isHolding callback
  useEffect(() => {
    if (isHolding) callbackRef.current()
  }, [isHolding])

  // Repeated isHolding callbacks
  useInterval(callbackRef.current, isHolding ? delay : null)

  return {
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
  }
}
