import { Routes, Route } from 'react-router'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Aside } from './pages/component/Aside.jsx'
import { Header } from './pages/component/Header.jsx'
import { DashPage } from './pages/dashBoard/DashPage.jsx'
import { HistoryPage } from './pages/history/HistoryPage.jsx'
import './App.css'

function App() {
  const [history, setHistory] = useState([]);


  useEffect(() => {
    const fetchingData = async () => {
      const responseHistory = await axios.get('/api/history');

      setHistory(responseHistory.data);
    }

    fetchingData();
  }, [])

  return (
    <>
      <Aside />

      <div className='main'>
        <Header />

        <Routes>
          <Route path="/" element={<DashPage history={history} />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
        </Routes>
      </div>
    </>

  )
}

export default App
