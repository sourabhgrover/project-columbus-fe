import { configureStore } from '@reduxjs/toolkit'
import schemasReducer from './schemas'
import tableListReducer from "./tableList"
import  schemaDetailsReducer  from './schemaDetails'
import  addBusinessTermReducer  from './addBusinessTerm'
import  useCaseReducer  from './useCase'
import businessGlossaryReducer from './businessGlossarySlice';
import domainReducer from './domainSlice';
import ownershipReducer from './ownerShipSlice';

const store = configureStore({
  reducer: {
    schemas: schemasReducer,
    tableList: tableListReducer,
    schemaDetails: schemaDetailsReducer,
    manageBusinessTerm: addBusinessTermReducer,
    useCase: useCaseReducer,
    businessGlossary: businessGlossaryReducer,
    domains: domainReducer,
    ownership: ownershipReducer,
  }
})

export default store