import React from 'react'

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage === '') {
    return null
  }

  return <p>{errorMessage}</p>
}

export default ErrorMessage
