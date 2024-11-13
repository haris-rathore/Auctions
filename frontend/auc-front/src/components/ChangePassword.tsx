import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import _socketContext from './socketContext';
import _userContext from './UserContext';
import './ChangePassword.css'

const ChangePassword = () => {
    const socket = useContext(_socketContext);
    const navigate = useNavigate();
    const {state} = useLocation();
    const _username = state._username;
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [incorrect, setIncorrect] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
    } else {
      const profile = {_username, newPassword, currentPassword};
      socket.emit('ChangePassword', profile);
      socket.on('ChangePassword', (responseJSON:any)=>{
        if(responseJSON.error){
            setError("Incorrect Password");
        }
        else{
            console.log("Password changed successfully")
            navigate("/Profile", {state: {_username}})
        }
      })

      // Reset form fields and error message
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setError('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;