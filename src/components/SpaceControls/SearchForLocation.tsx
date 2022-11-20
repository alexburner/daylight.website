import React, { useState } from 'react'
import { Space } from '~singletons/interfaces'

export const SearchForLocation = ({
  setLocalSpace,
}: {
  setLocalSpace: (s: Space) => void
}): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  return (
    <div>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          placeholder="Search for location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          style={{
            flexGrow: 1,
            fontSize: '16px',
            padding: ' 13px 16px',
            border: '1px solid #EEE',
            borderRadius: '6px',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        <FormButton
          isDisabled={loading}
          style={{
            position: 'relative',
            borderLeft: 'none',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          onClick={() => {
            setLoading(true)
          }}
        >
          &nbsp;
          <span
            style={{
              position: 'absolute',
              top: 'calc(50%)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
            }}
          >
            {loading ? '⇄' : '⚲'}
          </span>
        </FormButton>
      </div> */}
    </div>
  )
}
