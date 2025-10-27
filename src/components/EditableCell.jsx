import { useState, useEffect } from 'react'

const EditableCell = ({ value, onUpdate, field, rowId }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  useEffect(() => {
    setEditedValue(value)
  }, [value])

  const handleBlur = () => {
    setIsEditing(false)
    onUpdate(rowId, field, editedValue)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
    if (e.key === 'Escape') {
      setIsEditing(false)
      setEditedValue(value)
    }
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={editedValue}
        onChange={(e) => setEditedValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="editable-input"
      />
    )
  }

  return (
    <span onClick={() => setIsEditing(true)} className="editable-cell">
      {value}
    </span>
  )
}

export default EditableCell

