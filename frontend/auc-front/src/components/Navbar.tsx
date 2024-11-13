import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar(props:any) {
    const _username = props._username;
    const navigate = useNavigate();
    return (
        <div>
            <ul className="Navbar">
                <span className="sub-container">
                    <li onClick={(_username)=>{
                        navigate("/Home", {state: {_username} })
                    }}>Home</li>
                    <li><Link to="/Browse" state={_username}>Browse</Link></li>
                </span>
                <span className="sub-container"> 
                    <li onClick={(_username)=>{
                        navigate("/Profile", {state: {_username} })
                    }}><img src="../assets/user.png" alt="User Icon" width="40px" /></li>
                    <li><Link to="/Login">Logout </Link></li>
                </span>
            </ul>
        </div>
    );
}

export default Navbar;