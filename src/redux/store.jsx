import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import addToCart   from './reducer/GetProductArr'


export const store = configureStore({
    reducer:{
        addToCart: addToCart,
    }
})
