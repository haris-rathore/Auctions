import './Login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import _userContext from './UserContext';
import _socketContext from './socketContext';
import { useContext } from 'react';
// import _profileContext from './profileContext';
// import { navigate, useNavigate } from '@reach/router'

function Login(props:any){
    const navigate = useNavigate();
    const socket = useContext(_socketContext); 
    let userContext = useContext(_userContext);
//    let _profile = useContext(_profileContext);
    // const _username = props.user;
    // const setUsername = props.setUser;
    // const loggedIn = props.log;
    // if(loggedIn){
    //     return <Navigate to="/Home"/>
    // }
    const [success, setSuccess] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [_username, setUsername] = useState("");
    const [_password, setPassword] = useState("");
    const [notfound, setNotfound] = useState(false);

    const handleSubmission = async (f: any)=>{
        f.preventDefault();
        const profile = {_username, _password};
        try{
        
            socket.emit("login", profile);
            socket.on("login", async (responseJSON:any)=>{
            if(responseJSON.error){
                setNotfound(true);
                console.log(responseJSON)
            }
            else if(responseJSON.password != _password){
                setNotfound(false)
                console.log(responseJSON)
                setIncorrect(true);
                }
            else{
//            _profile = responseJSON;
            navigate("/Home", {state: {_username}})
            setUsername("");
            setPassword("");
            setSuccess(true);
        }})}
        catch(error: any){
            console.log(error);
        }
    }
    return(
        <div className="Login">
            <form className="login-form" onSubmit={handleSubmission}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e)=>{
                        setUsername(e.target.value);
                    }} value ={_username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }} value = {_password} />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
                <div className="form-group signup-link">
                    Don't have an account? <Link to="/">Sign up</Link>
                </div>
                <div>{success && <Navigate to="/Home" state={{userContext}}/>}</div>
                <div>
                {incorrect && <div className='incorrect'> Incorrect Password</div>}
                </div>
                <div>
                {notfound && <div className='notfound'> Username not found</div>}
                </div>
            </form>
        </div>
    )
}

export default Login