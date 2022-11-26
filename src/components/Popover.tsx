import React, { ReactNode, useCallback, useMemo, useState } from 'react'

type SetFn = () => void

/**
 * Based on ChakraUI Modal useDisclosure()
 * -> https://chakra-ui.com/docs/components/modal#usage
 */
export const usePopover = (): {
  isOpen: boolean
  setOpen: SetFn
  setClose: SetFn
} => {
  const [isOpen, setIsOpen] = useState(false)
  const setOpen = useCallback(() => setIsOpen(true), [])
  const setClose = useCallback(() => setIsOpen(false), [])
  return useMemo(
    () => ({
      isOpen,
      setOpen,
      setClose,
    }),
    [isOpen, setOpen, setClose],
  )
}

export const PopoverWrapper = ({
  children,
}: {
  children?: ReactNode
}): JSX.Element => <div style={{ position: 'relative' }}>{children}</div>

export const PopoverTrigger = ({
  children,
  setOpen,
}: {
  children?: ReactNode
  setOpen: SetFn
}): JSX.Element => (
  <div
    style={{
      display: 'inline-block',
      cursor: 'pointer',
    }}
    onClick={setOpen}
  >
    {children}
  </div>
)

const ARROW_SIZE = 15

export const Popover = ({
  isOpen,
  setClose,
  children,
}: {
  isOpen: boolean
  setClose: () => void
  children?: ReactNode
}): JSX.Element | null => {
  if (!isOpen) return null
  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 10,
        }}
        onClick={setClose}
      ></div>
      {/* Popover Body */}
      <div
        style={{
          width: '400px',
          height: 'auto',
          position: 'absolute',
          bottom: 'calc(100% + 15px)',
          right: '50%',
          zIndex: 10,
          transform: 'translateX(50%)',
          background: '#FFF',
          border: '1px solid #E8E8E8',
          borderRadius: '10px',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Popover Arrow */}
        <div
          style={{
            width: `${ARROW_SIZE}px`,
            height: `${ARROW_SIZE}px`,
            position: 'absolute',
            bottom: `-${ARROW_SIZE}px`,
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            borderBottom: '1px solid #E8E8E8',
            borderRight: '1px solid #E8E8E8',
            background: '#FFF',
          }}
        />
        {/* Popover Content */}
        {children}
      </div>
    </>
  )
}
