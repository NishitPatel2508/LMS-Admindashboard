import React from 'react'
import { useSelector } from 'react-redux'

const AccessToken = () => {
    const accessToken = useSelector((state) => state.accessToken)
  return accessToken
}

export default AccessToken