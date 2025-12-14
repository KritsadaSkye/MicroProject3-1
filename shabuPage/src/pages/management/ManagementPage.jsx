import './ManagementPage.css';
import redStick from '../../../public/red_stick.png';

export function ManagementPage() {
    return (
        <>
            <main className="Management-page">
                <div className="item-card">
                    <div className="item-image-container"><img src={redStick} /></div>
                    <div className="item-name">ไม้แดง</div>
                    <div className="item-price">ราคา 5 บาท</div>
                </div>
                <div className="item-card">
                    fdsf
                </div>
                <div className="item-card">
                    fdsf
                </div>
            </main>
        </>
    )
}