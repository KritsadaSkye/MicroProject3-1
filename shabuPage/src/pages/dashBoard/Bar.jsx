import dayjs from "dayjs";
import { getRevenuePercent } from "../../utils/getRevenuePercent.js";

export function Bar({ item, weeklyHistory }) {
    console.log(weeklyHistory);
    return (
        < div className="bar" >
            <div className={`bar-fill ${dayjs(item.date).format('ddd')}`} style={{ height: `${getRevenuePercent(weeklyHistory, item.totalRevenue)}%` }}></div>
            <div className="bar-label">{dayjs(item.date).format('dddd')}</div>
        </div>
    )
}