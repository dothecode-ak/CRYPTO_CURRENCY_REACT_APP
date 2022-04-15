import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 
import CrptoContext from './cryptoContext/CrptoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CrptoContext>
      <App />
    </CrptoContext>
  </React.StrictMode>
);
 
