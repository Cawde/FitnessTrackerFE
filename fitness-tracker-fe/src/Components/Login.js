// import { useState } from 'react'
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
// import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import './login.css';
// import { loginUser } from '../api';
// import { getToken } from '../auth';

// const Login = ({
//     setLoggedIn,
//     setUsername,
// }) => {
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = useState('');
//     const [passwordValue, setPasswordValue] = useState('');
//     const useStyles = makeStyles((theme) => ({
//         margin: {
//             margin: theme.spacing(1),
//         },
//     }));
//     const theme = createMuiTheme({
//         palette: {
//           primary: {
//             main: '#021b27ff'
//           },
//         },
//         secondary: {
//             main: '#e737a7ff',
//           },
//     });
//     const ColorButton = withStyles((theme) => ({
//         root: {
          
//         },
//       }))(Button);
//     const classes = useStyles();
//     return (
//         <div className="login-container">
//             <ThemeProvider theme={theme}>
//                 <ColorButton 
//                     variant="contained" 
//                     color="primary" 
//                     className={classes.margin}
//                     onClick={() => setOpen(true)}>
//                     Login
//                 </ColorButton>
//             </ThemeProvider>      
//             <Dialog className='login-modal-backdrop'
//                 open={open} 
//                 onClose={() => setOpen(false)}
//                 boxShadow={3}
//                 PaperProps={{
//                     style: {
//                     backgroundColor: '#589aafff',
//                     color: '#f6e8a2ff'
//                     },
//                 }}
//                 >
//             <DialogTitle 
//                 id="login-modal-title"
//                 style={{color: 'rgb(66, 90, 180)'}}
//             >
//                 Sign In
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Please enter your Username and Password
//                 </DialogContentText>
//             <TextField
//                 autoFocus
//                 id="Username"
//                 label="Username"
//                 type="text"
//                 fullWidth
//                 value={value}
//                 onChange={(event) => setValue(event.target.value)}
                
//             />
//             <TextField
//                 id="Password"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={passwordValue}
//                 onChange={(event) => setPasswordValue(event.target.value)}
                
//             />
//             </DialogContent>
//             <DialogActions>
//                 <Button 
//                     onClick={() => setOpen(false)} 
//                     color="primary">
//                     Cancel
//                 </Button>
//                 <Button 
//                     onClick={async () => {
//                         setOpen(false);
//                         loginUser(value, passwordValue);
//                         setTimeout(() => {
//                             let token = '';
//                             token = getToken();
//                             token ? setUsername(value) : '';
//                             token ? setLoggedIn(true) : setLoggedIn(false);
//                             console.log(token);
//                         }, 1200);   
//                     }} 
//                     color="primary">
//                     Login
//                 </Button>
//             </DialogActions>
//             </Dialog>       
//         </div>
//     )
// }

// export default Login;

import React, { useState } from 'react';

const BASE_URL = "https://murmuring-journey-02933.herokuapp.com/api"

const Login = (props) => {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  let pass = '';
  let user = '';

  // const storeToken = (token, user) => {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('user', user);
  // }

  const registerUser = (event) => {
    event.preventDefault();
    fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user,
        password: pass
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      }).catch(console.error);
  }
  
const loginUser = (event) => {
  event.preventDefault();
  fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: user,
        password: pass
      }
    })
  }).then(response => response.json())
    .then(result => {
      console.log(result);
    }).catch(console.error);
}

  return (
    <div className="login">
      <h1>Register or Sign in below</h1>
      <form className="input-box" onSubmit={registerUser}>
        <div className="container">
          <label><b>Enter Username</b></label>
          <input 
            type="text" 
            name="uname" 
            placeholder="Enter Username" required 
            onChange={(event)=> {user = event.target.value}}
            />

          <label><b>Enter Password</b></label>
          <input 
            type="password" 
            name="pass"
            pattern=".{8,16}" 
            title="8 or more characters" 
            size="20" 
            placeholder="Enter Password" required
            onChange={(event)=> {pass = event.target.value}}
            />
          <hr/>
          <button
            type="submit" 
            className="registerbtn" 
            >Register</button>
          <h2><b>Already have an account?</b> <button type="submit" className="sign-in-btn" onClick={loginUser}>Sign In</button></h2>
        </div>
      </form>
    </div>
  )
}

export default Login;