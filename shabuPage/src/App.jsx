import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import { Aside } from './pages/component/Aside.jsx'
import { Header } from './pages/component/Header.jsx'
import { DashPage } from './pages/dashBoard/DashPage.jsx'
import { HistoryPage } from './pages/history/HistoryPage.jsx'
import './App.css'
import { useState } from 'react'

function App() {

  return (
    <>
      <Aside />

      <div className='main'>
        <Header />

        <Routes>
          <Route path="/" element={<DashPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </>

  )
}

export default App
