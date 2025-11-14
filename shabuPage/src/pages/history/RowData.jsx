import dayjs from "dayjs"

export function RowData({ day }) {
    return (
        < tr >
            <td>{dayjs(day.date).format('DD/MM/YYYY')}</td>
            <td>{day.redStick}</td>
            <td>{day.yellowStick}</td>
            <td>{day.blueStick}</td>
            <td>{day.totalRevenue}</td>
        </tr >
    )
}