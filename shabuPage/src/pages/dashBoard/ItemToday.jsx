import { totalPrice } from "../../utils/totalPrice";

export function ItemToday({ todayItem }) {
    return (
        <div className="item-col">
            <div className="item-name">{`${todayItem.name} (${todayItem.price})`}</div>
            <div className="item-count">{todayItem.count}</div>
            <div className="item-price">{totalPrice(todayItem.count, todayItem.price)}</div>
        </div>
    )
}