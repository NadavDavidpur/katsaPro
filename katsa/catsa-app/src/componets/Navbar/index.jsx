import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './style.css';


export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <nav className="nav" dir="rtl">
            <ul>
                <li className="site-title">שלום {user.username}</li>
                <CustomLink to="/projects">פרוייקטים</CustomLink>
                {user.isManager && <CustomLink to="/workers">עובדים</CustomLink>}
                <li>
                    <button onClick={handleLogout} className="text-start position-absolute start-0 mt-2 btn btn-link">
                        התנתק
                    </button>
                </li>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} className="w-25 lihover">
                {children}
            </Link>
        </li>
    );
}
