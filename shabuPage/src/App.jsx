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
  const [priceStick, setPriceStick] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const responseHistory = await axios.get('/api/history');
      const responsePrice = await axios.get('/api/pricestick');

      setHistory(responseHistory.data);
      setPriceStick(responsePrice.data);
    }

    fetchingData();
  }, [])

  console.log(history);
  console.log(priceStick);

  return (
    <>
      <Aside />

      <div className='main'>
        <Header />

        <Routes>
          <Route path="/" element={<DashPage history={history} priceStick={priceStick} />} />
          <Route path="/history" element={<HistoryPage history={history} priceStick={priceStick} />} />
        </Routes>
      </div>
    </>

  )
}

export default App
