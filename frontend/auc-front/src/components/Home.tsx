import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';
import _socketContext from './socketContext';
import { useContext } from 'react';

function Home(props:any) {
    const navigate = useNavigate();
    const socket = useContext(_socketContext);
    const {state} = useLocation();
    const _username = state._username;
    return (
        <>
        <div>
            <ul className="Navbar">
                <span className="sub-container">
                    <li onClick={()=>{
                        navigate("/Home", {state: {_username}})
                    }}>Home</li>
                    <li onClick={()=>{
                        navigate("/Browse", {state: {_username}})
                    }}> Browse</li>
                </span>
                <span className="sub-container"> 
                    <li onClick={()=>{
                        navigate("/Profile", {state: {_username}})
                    }}><img src="../assets/user.png" alt="User Icon" width="40px" /></li>
                    <li><Link to="/Login">Logout </Link></li>
                </span>
            </ul>
        </div>
        <div className="Home">
            <div>
                <h1>Welcome to BidMe</h1>
                <p className="subtitle">Discover unique items and bid to win!</p>
                {/* <button className="join">Join Now!</button> */}
            </div>
        </div>
        </>
    );
}

export default Home;