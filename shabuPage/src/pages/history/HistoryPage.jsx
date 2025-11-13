import './HistoryPage.css';

export function HistoryPage() {
    return (
        <>
            <main class="content">
                <section class="history-section">
                    <div class="card history-card">
                        <div class="table-container">
                            <table class="history-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>ไม้แดง(5)</th>
                                        <th>ไม้เขียว(10)</th>
                                        <th>ไม้ฟ้า(15)</th>
                                        <th>ถ้วย(5)</th>
                                        <th>ถุง(5)</th>
                                        <th>Total Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2025-11-10</td>
                                        <td>30</td>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>20</td>
                                        <td>30</td>
                                        <td>650฿</td>
                                    </tr>
                                    <tr>
                                        <td>2025-11-09</td>
                                        <td>25</td>
                                        <td>15</td>
                                        <td>12</td>
                                        <td>18</td>
                                        <td>25</td>
                                        <td>590฿</td>
                                    </tr>
                                    <tr>
                                        <td>2025-11-08</td>
                                        <td>28</td>
                                        <td>12</td>
                                        <td>8</td>
                                        <td>22</td>
                                        <td>28</td>
                                        <td>610฿</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}