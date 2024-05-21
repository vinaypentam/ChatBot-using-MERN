import { AppBar, Toolbar } from '@mui/material';
import React from 'react';
import Logo from './Logo';
import { useAuth } from '../context/Authcontext';
import Navigationlink from './Navigationlink';



function Header() {

  const auth = useAuth();
  return (
    <div>
      <AppBar sx={{bgcolor: 'transparent', boxShadow: "none", position: "static"}}>
        <Toolbar>
          <Logo/>
          <div style={{display: "flex", gap: "15px"}}>
            {auth?.isLoggedIn ? (
            <>
            <Navigationlink to = "/chat" bg = "#00fffc" value = "chats" color = "black"/>
            <Navigationlink to = "/" bg = "#00fffc" value = "logout" color = "black" onclick = {auth?.logout}/>
            </>
            ):( 
             <>
             <Navigationlink to = "/login" bg = "#00fffc" value = "login" color = "black"/>
             <Navigationlink to = "/signup" bg = "#00fffc" value = "signup" color = "black"/>
             </>
             )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}


export default Header

