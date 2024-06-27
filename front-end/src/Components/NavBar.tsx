import { Link } from 'react-router-dom';
import "../style/navBar.css"

const NavBar: React.FC = () => {
    return (
        <nav className="navbars flex justify-between">
            <div className="navbar-brand">
                <div className="nav-item"><Link to="/home" className="nav-link">Home</Link></div>
                <div className="nav-item"><Link to="/settings" className="nav-link">Réglages</Link></div>
                <div className="nav-item"><Link to="/createaccount" className="nav-link">Create Account</Link></div>
            </div>
            <div className='p-1'>
                <div className="nav-item"><Link to="/" className="nav-link">Déconnecter</Link></div>
            </div>
        </nav>
    );
}

export default NavBar;