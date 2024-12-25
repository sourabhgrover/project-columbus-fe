import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './rtk/store.js'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ToastContainer />
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
