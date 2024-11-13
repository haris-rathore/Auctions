import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Navbar from './Navbar';
import './SpecificAuction.css';
import _socketContext from './socketContext';
import { useNavigate, useLocation } from 'react-router-dom';
function SpecificAuction() {
    const navigate = useNavigate();
    const socket = useContext(_socketContext);
    const {state} = useLocation();
    const _username = state._username;
    const _auction = state.auction;
    const id = _auction._id;
    console.log("auction creator: ", _auction.creator);
    const [error, setError] = useState('');
    const [currPrice, setCurrPrice] = useState(_auction.current_price);
    const [bid, setBid] = useState(0);
    socket.on('setPrice', (price)=>{
        setCurrPrice(price.bidVal)
    })
    const bidHandler = () =>{
        const time = Date.now();
        if(time > _auction.ending_time){
            setError('Auction has ended')
        }else if(_auction.creator == _username){
            setError('You can not bid on your own auction')
        }else if(currPrice == -1 && bid < _auction.starting_price){
            setError('Your bid must be at least the starting price')
        }
        else if(bid <= currPrice){
            setError('Your bid must be greater than the current price')
        }
        else{
            setError('')
            const bidData = {bid, _username, id}
            socket.emit('bid', bidData)
        }
    }
    return (
        <>
        <div>
            <ul className="Navbar">
                <span className="sub-container">
                    <li onClick={()=>{
                        const idObj = { id }
                        socket.emit('leaveRoom', id);
                        navigate("/Home", {state: {_username}})
                    }}>Home</li>
                    <li onClick={()=>{
                        socket.emit('leaveRoom', id);
                        navigate("/Browse", {state: {_username}})
                    }}> Browse</li>
                </span>
                <span className="sub-container"> 
                    <li onClick={()=>{
                        socket.emit('leaveRoom', id);
                        navigate("/Profile", {state: {_username}})
                    }}><img src="../assets/user.png" alt="User Icon" width="40px" /></li>
                    <li><Link to="/Login">Logout </Link></li>
                </span>
            </ul>
        </div>
        <div className="auction-details">
            <div className="auction-image">
                <img src="" alt="Item Image" />
            </div>
            <div className="auction-info">
                <h2 className="auction-title">{_auction.title}</h2>
                <p className="description">{_auction.description}</p>
                <p><strong>Starting Price:</strong> Rs. {_auction.starting_price}</p>
                <p><strong>Current Price:</strong> Rs. {currPrice == -1 ? _auction.starting_price : currPrice}</p>
                <p><strong>Start Time:</strong> {_auction.starting_date}</p>
                <p><strong>End Time:</strong> {_auction.ending_date}</p>
                <div className="bid-form">
                    <label htmlFor="bidAmount">Your Bid:</label>
                    <input type="number" id="bidAmount" name="bidAmount" min="0" step="1" required onChange={(e)=>{
                        setBid(Number(e.target.value));
                    }} value = {bid}  />
                    <button type="submit" onClick={bidHandler}>Place Bid</button>
                </div>
                {error && <div>{error}</div>}
            </div>
        </div>
        </>
    );
}

export default SpecificAuction;