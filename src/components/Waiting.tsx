import React from 'react'

const Waiting = (): JSX.Element => (
  <div
    style={{
      textAlign: 'center',
      transform: 'translateY(-50%)',
      position: 'relative',
      top: '40%',
    }}
  >
    Waiting for geolocation...
  </div>
)

export default Waiting
