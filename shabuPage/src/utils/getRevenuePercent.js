export function getRevenuePercent(weeklyHistory, todayRevenue) {
    let weekRevenue = 0;
    weeklyHistory.forEach((item) => {
        weekRevenue += item.totalRevenue;
    })

    console.log(Number((todayRevenue / weekRevenue) * 100));
    return Number((todayRevenue / weekRevenue) * 100);
}