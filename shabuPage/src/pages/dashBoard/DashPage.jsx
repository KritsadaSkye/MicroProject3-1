import axios from 'axios';
import { useState, useEffect } from 'react';
import { Today } from './Today.jsx';
import './DashPage.css';

export function DashPage() {
    const [todayItems, setTodayItems] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            const responsetTodayItems = await axios.get('/api/today-summary');

            setTodayItems(responsetTodayItems.data);
        }

        fetchingData();
    }, [])

    return (
        <>
            <main className="content">
                <section className="top-row">
                    <Today todayItems={todayItems} />

                    <div className="ratio-container">
                        <h2 className="card-title">Item Ratio</h2>
                        <div className="card ratio-card">
                            <div className="ratio-inner">
                                <div className="date-pill">12/09/2025</div>
                                <div className="items-ratio-grid">
                                    <div className="donut-placeholder" aria-hidden="true">
                                        <svg viewBox="0 0 42 42" className="donut">
                                            <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954"></circle>
                                            <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954"></circle>
                                            <circle className="donut-segment s1" cx="21" cy="21" r="15.91549430918954"
                                                strokeDasharray="30 70" strokeDashoffset="25"></circle>
                                            <circle className="donut-segment s2" cx="21" cy="21" r="15.91549430918954"
                                                strokeDasharray="20 80" strokeDashoffset="-5"></circle>
                                            <circle className="donut-segment s3" cx="21" cy="21" r="15.91549430918954"
                                                strokeDasharray="20 80" strokeDashoffset="-35"></circle>
                                            <circle className="donut-segment s4" cx="21" cy="21" r="15.91549430918954"
                                                strokeDasharray="15 85" strokeDashoffset="-65"></circle>
                                            <circle className="donut-segment s5" cx="21" cy="21" r="15.91549430918954"
                                                strokeDasharray="15 85" strokeDashoffset="-90"></circle>
                                        </svg>
                                    </div>

                                    <ul className="legend">
                                        <li><span className="dot red"></span>ไม้แดง</li>
                                        <li><span className="dot green"></span>ไม้เขียว</li>
                                        <li><span className="dot blue"></span>ไม้ฟ้า</li>
                                        <li><span className="dot purple"></span>ถ้วย</li>
                                        <li><span className="dot pink"></span>ไม้ถุง</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="weekly-row">
                    <div className="card weekly-card">
                        <h2 className="card-title">Weekly</h2>
                        <div className="bars">
                            <div className="bar">
                                <div className="bar-fill red" style={{ height: '60%' }}></div>
                                <div className="bar-label">Monday</div>
                            </div>
                            <div className="bar">
                                <div className="bar-fill lightgreen" style={{ height: '75%' }}></div>
                                <div className="bar-label">Tuesday</div>
                            </div>
                            <div className="bar">
                                <div className="bar-fill green" style={{ height: '80%' }}></div>
                                <div className="bar-label">Wednesday</div>
                            </div>
                            <div className="bar">
                                <div className="bar-fill orange" style={{ height: '70%' }}></div>
                                <div className="bar-label">Thurday</div>
                            </div>
                            <div className="bar">
                                <div className="bar-fill blue" style={{ height: '78%' }}></div>
                                <div className="bar-label">Friday</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}