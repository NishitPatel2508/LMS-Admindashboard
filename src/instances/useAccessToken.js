import React from 'react'
import { useSelector } from 'react-redux'

const useAccessToken = () => {
    const accessToken = useSelector((state) => state.accessToken)
    if(accessToken){
        return accessToken
    }

}

export default useAccessToken