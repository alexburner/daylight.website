import React, { useState } from 'react'
import { Space } from '~singletons/interfaces'
import { getSpace } from '~singletons/space'

export const UseCurrentLocation = ({
  onSuccess,
}: {
  onSuccess: (s: Space) => void
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  return (
    <button
      className="button is-info is-light is-large"
      disabled={loading}
      onClick={() => {
        setLoading(true)
        getSpace()
          .then((s) => onSuccess(s))
          .catch((e) => alert(e.message))
          .finally(() => setLoading(false))
      }}
    >
      <span>{loading ? 'Requesting Location...' : 'Use Current Location'}</span>
      <span className="icon is-small">
        {loading ? (
          <i className="fa fa-circle-o-notch fa-spin fa-fw" />
        ) : (
          <i className="fa fa-crosshairs" />
        )}
      </span>
    </button>
  )
}
