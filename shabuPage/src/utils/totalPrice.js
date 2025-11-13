export function totalPrice(count, price) {
    return count * price;
}

export function calculateTotalRevenue(todayItems) {
    const totalRevenue = todayItems.reduce((total, item) => {
        return total + (item.count * item.price);
    }, 0);

    return totalRevenue;
}