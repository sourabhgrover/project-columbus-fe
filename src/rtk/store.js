import { configureStore } from '@reduxjs/toolkit'
import schemasReducer from './schemas'
import tableListReducer from "./tableList"
import  schemaDetailsReducer  from './schemaDetails'

const store = configureStore({
  reducer: {
    schemas: schemasReducer,
    tableList: tableListReducer,
    schemaDetails: schemaDetailsReducer
  }
})

export default store