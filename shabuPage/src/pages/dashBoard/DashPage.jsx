import axios from 'axios';
import { useState, useEffect } from 'react';
import { Today } from './Today.jsx';
import { Ratio } from './Ratio.jsx';
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

                    <Ratio todayItems={todayItems} />
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