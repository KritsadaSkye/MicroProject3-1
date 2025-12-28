import axios from 'axios';
import { useState, useEffect } from 'react';
import { CardItem } from './CardItem.jsx';
import './ManagementPage.css';


export function ManagementPage() {

    const [items, setItems] = useState([]);

    const fetchingData = async () => {
        const responseItems = await axios.get('/api/get-items');
        setItems(responseItems.data);
    }

    useEffect(() => {
        fetchingData();
    }, [])

    return (
        <>
            <main className="Management-page">
                {items.map((item) => {
                    return <CardItem key={item.type} item={item} />
                })}
            </main >
        </>
    )
}