import { Link } from 'react-router-dom';
import './CreateAuction.css';
import Navbar from './Navbar';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import _socketContext from './socketContext';

function CreateAuction(props:any) {
    const navigate = useNavigate();
    const socket = useContext(_socketContext);
    const {state} = useLocation();
    const _username = state._username;
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [startingPrice, setStartingPrice] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const auctionCreater = async (f:any)=>{
        f.preventDefault();
        const auction = {_username, title, description, startingPrice, startTime, endTime};
        try{
            socket.emit('createAuction', auction);
            socket.on('createAuction', async (responseJSON)=>{
                if(!responseJSON.error){
                    console.log('auction created successfully', responseJSON);
                    navigate("/Profile", {state: {_username}});
                }
            })
        }catch(err){
            console.log(err);
        }

    }
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
        <div className="container">
            <h1>Create Auction</h1>
            <form onSubmit={auctionCreater}>
                <label htmlFor="itemImage">Item Image:</label>
                {/* <input type="file" id="itemImage" name="itemImage" accept="image/*" required /> */}
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required onChange={(e)=>{
                        setTitle(e.target.value);
                    }} value ={title}/>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows={4} required onChange={(e)=>{
                        setDescription(e.target.value);
                    }} value ={description}></textarea>
                <label htmlFor="startingPrice" >Starting Price:</label>
                <input type="number" id="startingPrice" name="startingPrice" min="0" step="1" onChange={(e)=>{
                        setStartingPrice(Number(e.target.value));
                    }} required/>
                <label htmlFor="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" name="startTime" required onChange={(e)=>{
                        setStartTime(new Date(e.target.value));
                    }}/>
                <label htmlFor="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" name="endTime" required onChange={(e)=>{
                        setEndTime(new Date(e.target.value));
                    }}/>
                <button type="submit">Create Auction</button>
            </form>
        </div>
        </>
    );
}

export default CreateAuction;