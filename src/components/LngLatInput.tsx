import React from 'react'
import { connect, Dispatch } from 'react-redux'

import {
    State,
    Space,
    ActionType,
} from '~singletons/interfaces'

interface StateProps {
    space?: Space
}

interface DispatchProps {
    setSpace(longitude: number, latitude: number): void
}

type Props = StateProps & DispatchProps

const LngLatInput = ({ space, setSpace }: Props): JSX.Element => {
    if (!space) return <div />
    return (
        <div>
            <label htmlFor='longitude'>Longitude:</label>
            <input id="longitude" type="number" value={space.longitude} onChange={e => {
                setSpace(+e.target.value, space.latitude)
            }} />
            <label htmlFor='latitude'>Latitude:</label>
            <input id="latitude" type="number" value={space.latitude} onChange={e => {
                setSpace(space.longitude, +e.target.value,)
            }} />
        </div>
    )
}

const mapStateToProps = ({ space }: State): StateProps => ({ space })

const mapDispatchToProps = (dispatch: Dispatch<State>): DispatchProps => ({
    setSpace: (longitude, latitude) => {
        dispatch({ type: ActionType.Space, space: { longitude, latitude } })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LngLatInput)
