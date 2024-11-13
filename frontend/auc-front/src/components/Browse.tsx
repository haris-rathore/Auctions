import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import './Navbar.css'
import './Browse.css';
import _socketContext from './socketContext';
// import { useNavigate } from '@reach/router';
// import { useLocation } from '@reach/router';

function Browse(props: any) {
    const navigate = useNavigate();
    const socket = useContext(_socketContext);
    const { state } = useLocation();
    const _username = state._username;
    const [auctions, setAuctions] = useState<any[]>([]);
    const [searched, setSearched] = useState(false);
    const [search, setSearch] = useState('');
    const [searchAuctions, setSearchAuctions] = useState<any[]>([]);

    useEffect(() => {
        socket.emit('getAuctions');
        socket.on('getAuctions', (auctionsArr: any) => {
            setAuctions(auctionsArr)
        })
    }, [])

    const handleSearch = async ()=>{
        if(search != ''){
            setSearched(true);
            const searchObj = {search};
            socket.emit('search', searchObj);
            socket.on('search', async (responseJSON:any)=>{
                let resp = await JSON.parse(JSON.stringify(responseJSON));
                setSearchAuctions(resp);
            })
        }
        else{
            setSearched(false);
            setSearchAuctions([]);
        }
    }

    return (

        <div className="container mx-auto" style={{overflow: 'scroll' , zoom: '90%', MozTransform: 'scale(0.9)', MozTransformOrigin: '0 0', OTransform: 'scale(0.9)', OTransformOrigin: '0 0', WebkitTransform: 'scale(0.9)', WebkitTransformOrigin: '0 0' }}>
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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="search-container flex items-center justify-center my-8">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 border border-gray-300 rounded-l-md focus:outline-none"
                        onChange={(e)=>{
                            setSearch(e.target.value);
                        }}
                        value = {search}
                    />
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-r-md hover:bg-gray-800 focus:outline-none"
                    onClick={handleSearch}>
                        Search
                    </button>
                </div>
                {!searched && auctions &&
                    auctions.map((auction) => (
                        <div className="auction-card bg-white shadow-md rounded-md p-4" key={auction._id} onClick={() => {
                            socket.emit('joinRoom', auction._id);
                            navigate("/SpecificAuction", { state: { _username, auction } })
                        }}>
                            <img
                                src="../assets/auction.png"
                                alt="Item Image"
                                className="w-full h-auto mb-4"
                            />
                            <div className="auction-details">
                                <h2 className="auction-title text-xl font-semibold">{auction.title}</h2>
                                <p className="description text-gray-600">{auction.description}</p>
                                <p className="text-gray-700">Starting Price: Rs. {auction.starting_price}</p>
                                <p className="text-gray-700">Start Time: {auction.starting_date}</p>
                                <p className="text-gray-700">End Time: {auction.ending_date}</p>
                            </div>
                        </div>
                    ))}
                    {searched &&
                    searchAuctions.map((auction) => (
                        <div className="auction-card bg-white shadow-md rounded-md p-4" key={auction._id} onClick={() => {
                            socket.emit('joinRoom', auction._id);
                            navigate("/SpecificAuction", { state: { _username, auction } })
                        }}>
                            <img
                                src="../assets/auction.png"
                                alt="Item Image"
                                className="w-full h-auto mb-4"
                            />
                            <div className="auction-details">
                                <h2 className="auction-title text-xl font-semibold">{auction.title}</h2>
                                <p className="description text-gray-600">{auction.description}</p>
                                <p className="text-gray-700">Starting Price: Rs. {auction.starting_price}</p>
                                <p className="text-gray-700">Start Time: {auction.starting_date}</p>
                                <p className="text-gray-700">End Time: {auction.ending_date}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>



    );
}

export default Browse;