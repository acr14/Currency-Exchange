import logo from './logo.svg';
import './App.css';
import React from 'react';
import CurrencyExchange from './components/CurrencyExchange';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'


function App() {
    return (
      <div>
        <CurrencyExchange />
      </div>
    );
}

export default App;
