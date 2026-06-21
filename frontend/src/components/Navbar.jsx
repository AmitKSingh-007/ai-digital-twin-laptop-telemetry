import "../styles/Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="nav-logo">
                💻 AI Twin
            </div>

            <div className="nav-links">

                <a href="#status">Status</a>

                <a href="#architecture">
                    Architecture
                </a>

                <a href="#summary">
                    Summary
                </a>

                <a href="#analytics">
                    Analytics
                </a>

                <a href="#predictions">
                    Predictions
                </a>

                <a href="#anomalies">
                    Anomalies
                </a>

                <a href="#simulation">
                    Simulation
                </a>

                <a href="#assistant">
                    AI Assistant
                </a>

            </div>

        </nav>

    );

}

export default Navbar;