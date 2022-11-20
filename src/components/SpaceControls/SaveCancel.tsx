import classNames from 'classnames'
import React from 'react'

export const SaveCancel = ({
  canSave,
  onSave,
  onCancel,
}: {
  canSave: boolean
  onSave: () => void
  onCancel: () => void
}): JSX.Element => {
  return (
    <div className="has-text-centered">
      <button
        className={classNames('button is-light', {
          'is-success': canSave,
        })}
        disabled={!canSave}
        onClick={onSave}
      >
        Save Changes
      </button>
      <button className="button ml-3" onClick={onCancel}>
        Cancel
      </button>
    </div>
  )
}
