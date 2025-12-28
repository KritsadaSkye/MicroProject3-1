import axios from 'axios';
import { useState } from 'react';
import redStick from '../../../public/red_stick.png';

export function CardItem({ item }) {

    const [price, setPrice] = useState();

    const updatePrice = async () => {
        const response = await axios.put('/api/prices/type', {
            type: item.type,
            price: price
        });
        console.log(response.data);
    }


    const [isEditing, setIsEditing] = useState(false);

    const edit = () => {
        setIsEditing(true);
    }


    return (
        <>
            <div className="item-card">
                <div className="item-image-container"><img src={redStick} /></div>
                <div className="items-details-container">
                    <div className="item-name">{item.type}</div>
                    <div className="item-price-edit-container">
                        <div className="item-price">ราคา {item.price} บาท</div>
                        <input placeholder='ราคาใหม่' style={{ width: 70, display: isEditing ? 'inline' : 'none' }} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                </div>
                <div className="item-update-price-container">
                    <button className="edit-button" onClick={edit} style={{ display: isEditing ? 'none' : 'inline' }}>
                        <span>edit</span>
                    </button>
                    <div className="update-price-form" style={{ display: isEditing ? 'inline' : 'none' }}>
                        <div className="update-price-form-buttons">
                            <div><button className="confirm-button" onClick={() => { setIsEditing(false); updatePrice(); }}>
                                <span>confirm</span>
                            </button>
                            </div>
                            <div>
                                <button className="cancel-button" onClick={() => setIsEditing(false)}>
                                    <span>cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}