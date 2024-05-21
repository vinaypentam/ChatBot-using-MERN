import {IoIosLogIn} from "react-icons/io"
import { Box, Button, TextField, Typography } from '@mui/material'
import { useAuth } from "../context/Authcontext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(auth?.user) return navigate("/");
  },[auth]);
  const handelLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password")as string;
    try {
      await auth?.login(email, password);
    } catch (error) {
      console.log(error);
    }
    // console.log(email, password);
  };
  return (

    <div>
      <Box display={'flex'} width={"100%"} height={"100%"}>
        <Box mt={8} padding={4} display={{md: "flex", sm: "none", xs: "none"}}>
          <img src="airobot.png" alt="robot" style={{width: "400px", height: "500px"}}/>
        </Box>
        <Box display={"flex"} flex={{md: 0.5, xs: 1}} padding={2} mt={16} alignItems={"center"} justifyContent={"center"} m={"auto"}>
          <form style={{margin: "auto", padding: "10px", boxShadow: "20px 20px 10px black"}} onSubmit={handelLogin}>
            <Box sx={{justifyContent:"center", flexDirection: "column", display: "flex", gap: "10px"}}>
              <Typography variant='h4' fontWeight={600} textAlign={"center"} padding={2} letterSpacing={"3px"}>
                Login
              </Typography>
              <TextField type='email' name='email' label="Email" InputLabelProps={{style:{color: "white", fontWeight:"600",letterSpacing:"2px"}}} inputProps={{style:{width:"400px", borderRadius:"10px", fontSize: 20, color: "white",}}}/>  
              <TextField type='password' name='password' label="Password" InputLabelProps={{style:{color:"white", fontWeight:"600",letterSpacing:"2px"}}} inputProps={{style:{width:"400px", borderRadius:"10px", fontSize: 20, color: "white"}}}/>
              <Button type='submit' sx={{width:"400px", bgcolor: "#00fffc", borderRadius: "10px",fontWeight: "600", ":hover":{
                bgcolor: "white", color: 'black'
              }} } endIcon={<IoIosLogIn/>} >Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default Login
