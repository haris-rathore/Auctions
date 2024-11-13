import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Profile.css';
import _socketContext from './socketContext';
// import _profileContext from './profileContext';

function Profile() {
    const socket = useContext(_socketContext);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const {state} = useLocation();
    const _username = state._username;
    const [myAuctions, setMyAuctions] = useState<any[]>([]);
    const [auctionsWon, setAuctionsWon] = useState<any[]>([]);
    const [username, setUsername] = useState('');
    const [numOfWon, setNumOfWon] = useState(0);
    const [time, setTime] = useState(Date.now());
    useEffect(()=>{
        socket.emit("getProfile", _username);
        socket.on("getProfile", async (responseJSON)=>{
        setName(responseJSON.name);
        setUsername(responseJSON.username);
        setMyAuctions(responseJSON.auctionsCreated);
        setAuctionsWon(responseJSON.auctionsWon);
        setNumOfWon(responseJSON.numOfWon);
        setTime(Date.now());
    })
    }, [])
    return (
        <div className="container mx-auto" style={{ zoom: '55%', MozTransform: 'scale(0.9)', MozTransformOrigin: '0 0', OTransform: 'scale(0.9)', OTransformOrigin: '0 0', WebkitTransform: 'scale(0.9)', WebkitTransformOrigin: '0 0' }}>
            <div className="Navbar">
                <span className="sub-container">
                    <li onClick={() => {
                        navigate("/Home", { state: { _username } })
                    }}>Home</li>
                    <li onClick={() => {
                        navigate("/Browse", { state: { _username } })
                    }}> Browse</li>
                </span>
                <span className="sub-container">
                    <li onClick={() => {
                        navigate("/Profile", { state: { _username } })
                    }}><img src="../assets/user.png" alt="User Icon" width="40px" /></li>
                    <li><Link to="/Login">Logout </Link></li>
                </span>
            </div>
        <div className="container">
            <div className="profile-info">
                <div className="profile-image">
                    <img src="user.jpg" alt="User Image" />
                </div>
                <div className="user-details">
                    <h2>Name: {name}</h2>
                    <p>Username: {username}</p>
                    <p>Items Owned: {numOfWon}</p>
                </div>
            </div>
            <div className="profile-actions">
                <button onClick={()=>{
                    navigate("/CreateAuction", {state: {_username}})
                }}>Create Auction</button>
                <button onClick={()=>{
                    navigate("/ChangePassword", {state: {_username}})
                }}>Update Password</button>
            </div>
            <h3>My Auctions</h3>
            <div className="auction-list">
                {myAuctions && myAuctions.map((auction)=>{
                    return(
                    <div className="auction-card" onClick={() => {
                        socket.emit('joinRoom', auction._id);
                        navigate("/SpecificAuction", { state: { _username, auction } })}}>
                    <h4>{auction.title}</h4>
                    <p>{auction.description}</p>
                    <p>Starting Price: Rs. {auction.starting_price}</p>
                    <p>Current Price: Rs. {auction.current_price == -1? auction.starting_price : auction.current_price}</p>
                    <p>Start Time: {auction.starting_date}</p>
                    <p>End Time: {auction.ending_date}</p>
                    <p>Status: {time > auction.ending_time ? 'Concluded' : time < auction.starting_time ? 'Not Started' : 'Ongoing'}</p>
                </div>
                )})}
            </div>
            <h3>Auctions Won</h3>
            <div className="auction-list">
            {auctionsWon && auctionsWon.map((auction)=>{
                    return(
                    <div className="auction-card" onClick={() => {
                        socket.emit('joinRoom', auction._id);
                        navigate("/SpecificAuction", { state: { _username, auction } })}}>
                    <h4>{auction.title}</h4>
                    <p>{auction.description}</p>
                    <p>Starting Price: Rs. {auction.starting_price}</p>
                    <p>Current Price: Rs. {auction.current_price == -1? auction.starting_price : auction.current_price}</p>
                    <p>Start Time: {auction.starting_date}</p>
                    <p>End Time: {auction.ending_date}</p>
                    <p>Status: {time > auction.ending_time ? 'Concluded' : time < auction.starting_time ? 'Not Started' : 'Ongoing'}</p>
                </div>
                )})}
            </div>
        </div>
        </div>
    );
}

export default Profile;