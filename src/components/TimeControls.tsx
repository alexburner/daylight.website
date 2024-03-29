import React, { ReactNode } from 'react'
import { connect, Dispatch } from 'react-redux'

import {
  State,
  Suns,
  Time,
  ActionType,
  NudgeDirection,
  NudgeDuration,
} from '~singletons/interfaces'
import { useMouseHold } from '~util/useMouseHold'

interface StateProps {
  now?: Time
  suns?: Suns
}

interface DispatchProps {
  nudge(direction: NudgeDirection, duration: NudgeDuration): void
}

interface ComponentProps {
  children?: ReactNode
}

type Props = StateProps & DispatchProps & ComponentProps

const OUTER_PADDING = '10px'
const BUTTON_GAP = '10px'

const TimeControls = ({ now, nudge, children }: Props): JSX.Element => {
  if (!now) return <div />
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        {/* Left panel */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            top: 0,
            bottom: 0,
            left: OUTER_PADDING,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: BUTTON_GAP,
          }}
        >
          <Button
            label="◀"
            callback={() => nudge(NudgeDirection.Backward, NudgeDuration.Day)}
            delay={200}
          />
          <Button
            label="◀◀"
            callback={() => nudge(NudgeDirection.Backward, NudgeDuration.Week)}
          />
        </div>
        {/* Right panel */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            top: 0,
            bottom: 0,
            right: OUTER_PADDING,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: BUTTON_GAP,
          }}
        >
          <Button
            label="▶"
            callback={() => nudge(NudgeDirection.Forward, NudgeDuration.Day)}
            delay={200}
          />
          <Button
            label="▶▶"
            callback={() => nudge(NudgeDirection.Forward, NudgeDuration.Week)}
          />
        </div>
      </div>
    </div>
  )
}

const Button = ({
  label,
  callback,
  delay,
}: {
  label: string
  callback: () => void
  delay?: number
}): JSX.Element => {
  const mouseHold = useMouseHold(callback, delay)
  return (
    <button
      style={{
        width: '70px',
        height: '70px',
        textAlign: 'center',
        background: 'transparent',
        border: '1px solid #E8E8E8',
        borderRadius: '300px',
        cursor: 'pointer',
        fontSize: '14px',
        padding: ' 0 4px',
        color: '#555',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      {...mouseHold}
    >
      {label}
    </button>
  )
}

const mapStateToProps = ({ now, suns }: State): StateProps => ({ now, suns })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  nudge: (direction, duration) =>
    dispatch({ type: ActionType.Nudge, direction, duration }),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
