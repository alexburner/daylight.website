import React, { ReactNode, useMemo, useState } from 'react'
import { connect, Dispatch } from 'react-redux'

import { State, Space, ActionType } from '~singletons/interfaces'
import { useSpaceLabel } from '~singletons/lookup'
import { getDmsStrings } from '~util/dms'
import { Popover, PopoverTrigger, PopoverWrapper, usePopover } from './Popover'
import { LatLongFields } from './SpaceControls/LatLongFields'
import { SaveCancel } from './SpaceControls/SaveCancel'
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
    <div style={{ margin: '24px 0 0' }}>
      <SpacePopover space={space} setSpace={setSpace}>
        <SpaceDisplay space={space} />
      </SpacePopover>
    </div>
  )
}

const SpaceDisplay = ({ space }: { space: Space }): JSX.Element => {
  if (!space) throw new Error('Unreachable')
  const dmsStrings = useMemo(
    () => getDmsStrings(space.latitude, space.longitude),
    [space.latitude, space.longitude],
  )
  const spaceLabel = useSpaceLabel(space)
  return (
    <div style={{ display: 'inline-block', padding: '4px 8px' }}>
      <div
        style={{
          fontSize: '14px',
        }}
      >
        {dmsStrings.lat} | {dmsStrings.long}
      </div>
      {spaceLabel && (
        <div
          style={{
            margin: '2px 0 0',
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {spaceLabel}
        </div>
      )}
    </div>
  )
}

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
            <UseCurrentLocation
              onSuccess={(s) => {
                setLocalSpace(s)
                setSpace(s.longitude, s.latitude)
                setClose()
              }}
            />
          </div>
          <div className="p-3">
            <LatLongFields
              localSpace={localSpace}
              setLocalSpace={setLocalSpace}
            />
          </div>
          <div className="p-4">
            <SaveCancel
              canSave={hasChanges}
              onSave={() => {
                setSpace(localSpace.longitude, localSpace.latitude)
                setClose()
              }}
              onCancel={() => {
                setLocalSpace(space)
                setClose()
              }}
            />
          </div>
        </div>
      </Popover>
    </PopoverWrapper>
  )
}

const mapStateToProps = ({ space }: State): StateProps => ({ space })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
  setSpace: (longitude, latitude) => {
    dispatch({ type: ActionType.Space, space: { longitude, latitude } })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceControls)
