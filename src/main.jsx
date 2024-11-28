import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import './index.css'
import './Styles/global.css'
import './Styles/variables.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/variables.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);