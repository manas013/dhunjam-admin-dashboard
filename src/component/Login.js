import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./login.css"
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/action';
import { TextField } from '@mui/material';
const Login = ({ onLogin }) => {
    const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleLogin = async  () => {
    // Validate email format
    const usernameRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{3,}$/;
    const Isvalidusername = usernameRegex.test(username);

    // Validate password length
    const isPasswordValid = password.length >= 8;

    if ( isPasswordValid && Isvalidusername) {
      // Perform any save logic here, such as API calls or local storage updates
      console.log('Username:', username);
      console.log('Password:', password);
      try {
        const response = await axios.post('https://stg.dhunjam.in/account/admin/login', {
          username,
          password,
        });
  
        if (response.data.status === 200) {
         dispatch(loginUser(response.data));
          onLogin(response.data.data.token);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
      }
    } else {
      alert('Invalid Username or password. Username must be one capital letters ,one special character and one number and password must be 8 character');
    }
  };


  return (
    <div className='login_Portal'>
        <h2 id='heading'>Venue Admin Login</h2>
        <div className='userName'>
        <TextField id="outlined-basic" label="Username" variant="outlined"value={username} onChange={handleUsernameChange}  />
       
        {/* <input type="text" style={{border: "1px #FFFFFF", color:"#FFFFFF" ,fontSize:"16px",fontFamily:"Poppins", borderRadius:"4px", backgroundColor:"black",padding:"5px", width:"600px"}} placeholder='username' value={username} onChange={handleUsernameChange} />  */}
        </div>
        <div className='Password'>
           <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
           <InputLabel htmlFor="outlined-adornment-password" style={{color:"FFFFFF", fontSize:"16px", textAlign:"center", marginLeft:"-8px", marginTop:"-9px"}}>
             Password
           </InputLabel>
           <OutlinedInput
             id="outlined-adornment-password"
             type={showPassword ? 'text' : 'password'}
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             endAdornment={
               <InputAdornment position="end">
                 <IconButton
                 style={{color:"#FFFF"}}
                   aria-label="toggle password visibility"
                   onClick={togglePasswordVisibility}
                   edge="end"
                 >
                   {showPassword ? <VisibilityOff /> : <Visibility />}
                 </IconButton>
               </InputAdornment>
             }
             label="Password"
           />
         </FormControl>
    </div>
    <div>
        <button className='signin' onClick={()=>handleLogin()}>Sign in </button>
    </div>
    <p className='text_2'>New Registration ?</p>

    </div>
  );
};

export default Login;
