import React, { useState } from 'react'
import { Space } from '~singletons/interfaces'
import { useLookupQuery } from '~singletons/lookup'

export const SearchForLocation = ({
  onSelect,
}: {
  onSelect: (s: Space) => void
}): JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const [query, setQuery] = useState<string>()
  const { loading, results, error } = useLookupQuery(query)
  const queryInput = () => inputValue && setQuery(inputValue)
  return (
    <div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search for a location..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && queryInput()}
            disabled={loading}
          />
        </div>
        <div className="control">
          <button
            className="button is-info"
            onClick={() => queryInput()}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
      {error && (
        <div className="notification is-danger is-light">{error.message}</div>
      )}
      {results &&
        (results.length === 0 ? (
          <div className="notification">No results for {`"${query}"`}</div>
        ) : (
          <div className="p-1">
            {results.map((result) => (
              <div
                key={result.label}
                style={{ overflow: 'hidden', display: 'flex' }}
              >
                <button
                  className="button is-white is-flex-grow-1"
                  onClick={() =>
                    onSelect({
                      latitude: result.latitude,
                      longitude: result.longitude,
                    })
                  }
                >
                  {result.label}
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
