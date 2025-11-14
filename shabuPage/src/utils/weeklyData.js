import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

export function weeklyData(history) {
    dayjs.extend(isBetween);
    dayjs.extend(isoWeek);
    dayjs.extend(utc);

    const startOfWeek = dayjs().startOf('isoWeek');
    console.log("Start of week:", startOfWeek.format('YYYY-MM-DD'));

    const endOfWeek = dayjs().endOf('isoWeek');
    console.log("Start of week:", endOfWeek.format('YYYY-MM-DD'));
    const currentWeekHistory = history.filter(item => {

        const itemDate = dayjs.utc(item.date);

        return itemDate.isBetween(startOfWeek, endOfWeek, null, '[]');
    });

    console.log(currentWeekHistory);
    return currentWeekHistory;
}