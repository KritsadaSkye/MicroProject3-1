import { totalPrice } from "../../utils/totalPrice";

export function ItemToday({ todayItem }) {
    return (
        <div className="item-col" style={{ border: `2px solid ${todayItem.id}` }}>
            <div className="item-name">{`${todayItem.name} (${todayItem.price})`}</div>
            <div className="item-count">{todayItem.count} ไม้ ทั้งหมด {totalPrice(todayItem.count, todayItem.price)} บาท</div>
        </div>
    )
}