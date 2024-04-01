import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import HomeReducer from './reducer/HomeReducer'


export const store = configureStore({
    reducer:{
        setProductAction: HomeReducer
    }
})
