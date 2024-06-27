import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item ml-12">
                <Link className="nav-link" to="/settings">Settings</Link>
            </li>
        </ul>
    );
}

export default NavBar;