import React from 'react'
import { Space } from '~singletons/interfaces'

export const LatLongFields = ({
  localSpace,
  setLocalSpace,
}: {
  localSpace: Space
  setLocalSpace: (s: Space) => void
}): JSX.Element => {
  return (
    <div className="columns is-variable is-1">
      <div className="column">
        <div className="field has-addons">
          <div className="control">
            <a className="button is-small is-static">Lat</a>
          </div>
          <div className="control is-expanded">
            <input
              className="input is-small has-text-centered"
              type="text"
              value={localSpace.latitude}
              onChange={(e) => {
                setLocalSpace({
                  latitude: Number(e.target.value),
                  longitude: localSpace.longitude,
                })
              }}
            />
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field has-addons">
          <div className="control">
            <a className="button is-small is-static">Long</a>
          </div>
          <div className="control is-expanded">
            <input
              className="input is-small has-text-centered"
              type="text"
              value={localSpace.longitude}
              onChange={(e) => {
                setLocalSpace({
                  latitude: localSpace.latitude,
                  longitude: Number(e.target.value),
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
