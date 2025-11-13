import { ItemToday } from "./ItemToday";

function calculateTotalRevenue(todayItems) {
    const totalRevenue = todayItems.reduce((total, item) => {
        return total + (item.count * item.price);
    }, 0);

    return totalRevenue;
}

export function Today({ todayItems }) {
    const totalRevenue = calculateTotalRevenue(todayItems);

    return (
        <div className="today-container">
            <h2 className="card-title">Today</h2>
            <div className="card today-card">
                <div className="items-grid">
                    {todayItems.map((todayItem) => {
                        return (<ItemToday key={todayItem.name} todayItem={todayItem} />)
                    })}
                </div>

                <div className="total">Total Revenue: <strong>{totalRevenue} Bath</strong></div>
            </div>
        </div>
    )
}