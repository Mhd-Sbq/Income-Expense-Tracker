import { useEffect, useState } from 'react'
import React from 'react';
import { BrowserRouter as Router , Routes , Route , useNavigate } from 'react-router-dom'

import Receipts_and_payments from './pages/Receipts_and_payments'

import Ledgers from './pages/Ledgers'

import Viewledger from './pages/Viewledger'

import './App.css'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {

  



  return (

    <Router>
      <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>}></Route>
          <Route path = "/Receipts_and_payments" element = {<Receipts_and_payments/>}></Route>
          <Route path = "/Ledgers" element = {<Ledgers/>}></Route>
          <Route path = "/Viewledger" element = {<Viewledger/>}></Route>
        </Routes>
    </Router>

  )
}

export default App
