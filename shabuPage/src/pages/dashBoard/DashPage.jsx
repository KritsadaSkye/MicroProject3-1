import axios from 'axios';
import { useState, useEffect } from 'react';
import { Today } from './Today.jsx';
import { Ratio } from './Ratio.jsx';
import { Bar } from './Bar.jsx';
import { weeklyData } from '../../utils/weeklyData.js';
import './DashPage.css';

export function DashPage({ history }) {
    const weeklyHistory = weeklyData(history);

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
                            {weeklyHistory.map((item) => {
                                return (
                                    <Bar item={item} weeklyHistory={weeklyHistory} />
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}