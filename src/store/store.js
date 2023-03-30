import {configureStore } from '@reduxjs/toolkit'
import NavDataSlice from './NavDataSlice.js'

export const store =  configureStore({
    reducer:{
        users: NavDataSlice
    },
})


