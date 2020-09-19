import React from 'react'

const SuccessMessage = ({ successMessage }) => {
  if (successMessage === '') {
    return null
  }
  return <p>{successMessage}</p>
}

export default SuccessMessage
