import React, {
  ButtonHTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Space, ActionType } from '~singletons/interfaces'
import { getSpace } from '~singletons/space'
import { getDmsStrings } from '~util/dms'
import { Popover, PopoverTrigger, PopoverWrapper, usePopover } from './Popover'
import { LatLongFields } from './SpaceControls/LatLongFields'
import { SearchForLocation } from './SpaceControls/SearchForLocation'
import { UseCurrentLocation } from './SpaceControls/UseCurrentLocation'

interface StateProps {
  space?: Space
}

interface DispatchProps {
  setSpace(longitude: number, latitude: number): void
}

type Props = StateProps & DispatchProps

const SpaceControls = ({ space, setSpace }: Props): JSX.Element => {
  if (!space) return <div />
  return (
    <div style={{ margin: '36px 0 0' }}>
      <SpacePopover space={space} setSpace={setSpace}>
        <SpaceDisplay space={space} />
      </SpacePopover>
    </div>
  )
}

const SpaceDisplay = ({ space }: { space: Space }): JSX.Element => {
  if (!space) throw new Error('Unreachable')
  const strings = useMemo(
    () => getDmsStrings(space.latitude, space.longitude),
    [space.latitude, space.longitude],
  )
  return (
    <div>
      <div
        style={{
          margin: '0 auto 6px',
          fontSize: '14px',
        }}
      >
        {strings.lat} | {strings.long}
      </div>
      <div
        style={{
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* 10733 Durland Avenue Northeast, Seattle, WA, USA */}
        Seattle, WA, USA
      </div>
    </div>
  )
}

const POPOVER_PADDING = '20px'

const SpacePopover = ({
  children,
  space,
  setSpace,
}: { children?: ReactNode } & Props): JSX.Element => {
  if (!space) throw new Error('Unreachable')

  const [localSpace, setLocalSpace] = useState(space)
  const hasChanges =
    localSpace.latitude !== space.latitude ||
    localSpace.longitude !== space.longitude

  const { isOpen, setOpen, setClose } = usePopover()

  return (
    <PopoverWrapper>
      <PopoverTrigger setOpen={setOpen}>{children}</PopoverTrigger>
      <Popover isOpen={isOpen} setClose={setClose}>
        <div className="space-popover-items">
          <div className="p-5">
            <UseCurrentLocation setLocalSpace={setLocalSpace} />
          </div>
          <div className="p-3">
            <LatLongFields
              localSpace={localSpace}
              setLocalSpace={setLocalSpace}
            />
          </div>
          <div className="p-2">
            {/* Save/Cancel */}
            <div style={{ textAlign: 'center' }}>
              <FormButton
                isDisabled={!hasChanges}
                onClick={() => {
                  setSpace(localSpace.longitude, localSpace.latitude)
                  setClose()
                }}
              >
                Save
              </FormButton>
              &nbsp; &nbsp;
              <FormButton
                onClick={() => {
                  setLocalSpace(space)
                  setClose()
                }}
              >
                Cancel
              </FormButton>
            </div>
          </div>
        </div>
      </Popover>
    </PopoverWrapper>
  )
}

const FormButton = ({
  isDisabled = false,
  children,
  style,
  ...props
}: { isDisabled?: boolean } & ButtonHTMLAttributes<
  HTMLButtonElement
>): JSX.Element => (
  <button
    style={{
      border: '1px solid #E8E8E8',
      borderRadius: '6px',
      fontSize: '18px',
      padding: ' 12px 24px',
      background: 'transparent',
      color: '#555',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      ...style,
    }}
    disabled={isDisabled}
    {...props}
  >
    {children}
  </button>
)

const mapStateToProps = ({ space }: State): StateProps => ({ space })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  setSpace: (longitude, latitude) => {
    dispatch({ type: ActionType.Space, space: { longitude, latitude } })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceControls)
