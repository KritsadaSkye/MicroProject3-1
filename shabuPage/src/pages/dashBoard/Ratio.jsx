import axios from "axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function Ratio({ todayItems }) {

    const [today, setToday] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            const responseToday = await axios.get('/api/today');
            setToday(dayjs((responseToday.data).date).format('DD/MM/YYYY'));
        }

        fetchingData();
    }, [])

    console.log(today);

    const totalCount = todayItems.reduce((sum, item) => sum + item.count, 0);

    const itemsWithPercent = todayItems.map(item => ({
        ...item,
        percentage: (item.count / totalCount) * 100
    }));

    const radius = 15.91549430918954;

    let cumulativeOffset = 0;


    return (
        <div className="ratio-container">
            <h2 className="card-title">Item Ratio</h2>
            <div className="card ratio-card">
                <div className="ratio-inner">
                    <div className="date-pill">{today}</div>
                    <div className="items-ratio-grid">
                        <div className="donut-placeholder">
                            <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">

                                <circle className="donut-ring" cx="21" cy="21" r={radius}></circle>

                                {itemsWithPercent.map((item, index) => {

                                    const strokeDasharray = `${item.percentage} 100`;
                                    const strokeDashoffset = cumulativeOffset;

                                    cumulativeOffset -= item.percentage;

                                    const segmentClass = `donut-segment s${index + 1}`;

                                    return (
                                        <circle
                                            key={item.name}
                                            className={segmentClass}
                                            cx="21"
                                            cy="21"
                                            r={radius}
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={strokeDashoffset}
                                        ></circle>
                                    );
                                })}

                                <circle className="donut-hole" cx="21" cy="21" r={radius}></circle>
                            </svg>
                        </div>

                        <ul className="legend">
                            <li><span className="dot red"></span>ไม้แดง</li>
                            <li><span className="dot yellow"></span>ไม้เหลือง</li>
                            <li><span className="dot blue"></span>ไม้ฟ้า</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}