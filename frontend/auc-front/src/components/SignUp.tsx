import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import './SignUp.css';
import { useState, useEffect, useContext } from 'react';
import _userContext from './UserContext';
import _socketContext from './socketContext';
// import _profileContext from './profileContext';

function SignUp(props:any){
    const navigate = useNavigate();
    const socket = useContext(_socketContext);
    let userContext = useContext(_userContext);
//    let _profile = useContext(_profileContext);
    // const loggedIn = props.log;
    if(userContext){
        return <Navigate to="/Home"/>
    }
    const [success, setSuccess] = useState(false);
    const [_name, setName] = useState("");
    const [_username, setUsername] = useState("");
    const [_password, setPassword] = useState("");
    const [_cpassword, setcPassword] = useState("");
    const [_passEqual, setPassEqual] = useState(true);
    const [error, setError] = useState(null);
    const [UsernameIsUnique, setUsernameIsUnique] = useState(true);
    const handleSubmission = async (f: any)=>{
        f.preventDefault();
        setUsernameIsUnique(true);
        if(_password !== _cpassword){
            setPassEqual(false);
        }else{
            setPassEqual(true);

        const profile = {_name, _username, _password};
        try{
        
            socket.emit("signUp", profile);
            socket.on("signUp", async (responseJSON:any)=>{
            if(responseJSON.error){
                if(responseJSON.error == "duplicate"){
                    setUsernameIsUnique(false);
                }else{
                    setError(responseJSON.error);
                    console.log(error);
                    setUsernameIsUnique(true);
                  }
                }
        else{
            //_profile = responseJSON;
            userContext = _username;
            navigate("/Home", {state: {_username}});
            setUsername("");
            setPassword("");
            setcPassword("");
            setError(null);

            setSuccess(true);
        }})}
        catch(error: any){
            if(error == "duplicate"){
                setUsernameIsUnique(false)
            }
            console.log(error);
        }
    }
}

    return(
        <div className="SignUp">
            <form className="login-form" onSubmit={handleSubmission}>
                <h2>Signup</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" onChange={(e)=>{
                        setName(e.target.value);
                    }} value= {_name} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e)=>{
                        setUsername(e.target.value);
                    }} value= {_username} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }} value = {_password} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter your password" onChange={(e)=>{
                        setcPassword(e.target.value);
                    }} value = {_cpassword} />
                </div>
                <div className="form-group">
                    <button type="submit">Sign Up</button>
                </div>
                <div className="form-group signup-link">
                    Already have an account? <Link to="/Login">Login</Link>
                </div>
                {!_passEqual && <div className='UneqPass'>
                    Passwords do not match
                    </div>}
                    <div>
                {!UsernameIsUnique && <div className='UniqueUser'> Username already taken</div>}
                </div>
            </form>
            <div>{success && <Navigate to="/Home" state={_username} /> }</div>
        </div>
    );
}

export default SignUp;