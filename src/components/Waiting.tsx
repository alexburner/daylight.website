import * as React from 'react'

export default (): JSX.Element => (
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
