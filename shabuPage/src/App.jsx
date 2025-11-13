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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const responseHistory = await axios.get('/api/history');
      const responseItems = await axios.get('/api/items');

      setHistory(responseHistory.data);
      setItems(responseItems.data);
    }

    fetchingData();
  }, [])

  return (
    <>
      <Aside />

      <div className='main'>
        <Header />

        <Routes>
          <Route path="/" element={<DashPage />} />
          <Route path="/history" element={<HistoryPage history={history} items={items} />} />
        </Routes>
      </div>
    </>

  )
}

export default App
