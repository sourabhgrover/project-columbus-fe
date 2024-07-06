import { configureStore } from '@reduxjs/toolkit'
import schemasReducer from './schemas'
import tableListReducer from "./tableList"
import  schemaDetailsReducer  from './schemaDetails'
import  addBusinessTermReducer  from './addBusinessTerm'

const store = configureStore({
  reducer: {
    schemas: schemasReducer,
    tableList: tableListReducer,
    schemaDetails: schemaDetailsReducer,
    manageBusinessTerm: addBusinessTermReducer
  }
})

export default store