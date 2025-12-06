export function Type({ todayItem }) {
    console.log(todayItem.id);

    return (
        <>
            <li><span class="dot" style={{ backgroundColor: todayItem.id }}></span>{todayItem.name}</li >
        </>
    )
}