import { NavLink } from 'react-router';
import shabuIcon from '../../assets/images/ShabuIcon.png';
import './Aside.css';

export function Aside() {
    return (
        <>
            <aside className="sidebar">
                <NavLink className="logo-link" to={"/"}>
                    <div className="brand">
                        <div className="logo"><img src={shabuIcon} /></div>
                        <div className="brand-text">
                            <strong>ShaBuDash</strong>
                        </div>
                    </div>
                </NavLink>

                <nav className="nav">
                    <NavLink className="nav-item" to={"/"}>
                        <span className="nav-icon">🏠</span>
                        <span className="nav-label">Dashboard</span>
                    </NavLink>
                    <NavLink className="nav-item" to={"/history"}>
                        <span className="nav-icon">📜</span>
                        <span className="nav-label">History</span>
                    </NavLink>
                    <NavLink className="nav-item" to={"/management"}>
                        <span className="nav-icon">📜</span>
                        <span className="nav-label">Management</span>
                    </NavLink>
                </nav>
            </aside>
        </>
    )
}