import './Header.css';

export function Header() {
    return (
        <>
            <header className="header">
                <h1 className="title">Overview</h1>
                <div className="status">
                    <span className="status-dot running"></span>
                    <span className="status-text">Running</span>
                </div>
            </header>
        </>
    )
}