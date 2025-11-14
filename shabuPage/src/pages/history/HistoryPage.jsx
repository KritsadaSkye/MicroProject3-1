import { RowData } from './RowData.jsx';
import './HistoryPage.css';

export function HistoryPage({ history }) {
    console.log('HistoryPage history:', history);
    return (
        <>
            <main className="content">
                <section className="history-section">
                    <div className="card history-card">
                        <div className="table-container">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>ไม้แดง(5)</th>
                                        <th>ไม้เขียว(10)</th>
                                        <th>ไม้ฟ้า(20)</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((day) => {
                                        return (
                                            <RowData key={day.date} day={day} />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}