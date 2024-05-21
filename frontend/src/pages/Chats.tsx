import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Box, Avatar, Typography, Button, IconButton} from '@mui/material'
import { useAuth } from '../context/Authcontext'
import { red } from '@mui/material/colors';
import ChatItem from '../chat/ChatItem';
import {IoMdSend} from "react-icons/io";
import { deleteUserChats, fetchUserChats, sendChatRequest } from '../helpers_func/api_communicator';
import { useNavigate } from 'react-router-dom';



function Chats() {
  type Message = {
    role: "user"|"assistant",
    content: string
  };
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement| null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth?.user){
      fetchUserChats().then((data)=> {
        setChatMessages([...data.chats]);
    }).catch((err) =>{
       console.log(err, "unable to load the chats");
    }) 

  }},[auth]);

  useEffect(()=>{
    if(!auth?.isLoggedIn){
      navigate("/login");
    }
  },[])

  const deleteChats = async() =>{
    try {
      const data = await deleteUserChats(); 
      if(data.message === "ok") setChatMessages([]);
    } catch (error) {
      console.log(error, "unable to delete the chats");
    }
  }
  const handleSubmit = async() =>{
      const content =  inputRef.current?.value as string;
      if(inputRef && inputRef.current) inputRef.current.value = "";
      const message: Message = {role: "user", content};
      setChatMessages((prev) => [...prev, message]);
      const data = await sendChatRequest(content);
      setChatMessages([...data.chats]);
  }


  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      gap: 3
    }}>
      <Box sx={{
        display: { md: "flex", sm: "none", xs: "none"},
        flex: 0.2,
        flexDirection: "column"
      }}>
        <Box sx={{width:"100%", height:"60vh", display:"flex", bgcolor: "rgb(17, 29, 39)", flexDirection: "column", mx: 3, borderRadius: 5}}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight:"700"}}>
          {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{
            mx: "auto", 
            fontFamily: "work sans"
          }}>
            You are talking to a CHATBOT
          </Typography>
          <Typography sx={{
            mx: "auto", 
            fontFamily: "work sans",
            my: 4,
            p:3
          }}>
            You can ask some question related to Knowledge, Business, Advices, Education, etc.
            But avoid sharing personal information 
          </Typography>
          <Button sx={{
            width: "200px",
            mx: "auto", 
            my: "auto",
            color: "white",
            bgcolor: red[400],
            ":hover" : {
              bgcolor: red.A400
            },
            borderRadius: 3,
            fontWeight: 700, 
          }} onClick={deleteChats}>Clear Conversation</Button>
        </Box>

      </Box>
      <Box sx={{display: "flex",  flex : {md : "0.8", xs: "1", sm: "1"}, flexDirection: "column", px: 3}}>
          <Typography sx={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "40px",
            color: "white",
            mx: "auto"
          }}>Model - GPT 3.5 Turbo</Typography>
          <Box sx={{
            dislay: "flex",
            flexDirection: "column",
            mx: "auto",
            borderRadius: 3,
            width: '100%',
            height: "60vh",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth"
          }}>
            
            {chatMessages.map((chat, index) => 
            //@ts-ignore
            <ChatItem content = {chat.content} role = {chat.role} key={index}/>
            )}
          </Box>
          <div style={{margin: "auto", backgroundColor:"rgb(17, 27,39)", width: "70%", display: "flex", padding: "10px", borderRadius: "30px", marginTop: "20px"}}>
            <input type="text" style={{fontSize: "20px", backgroundColor: "transparent", padding: "10px", width: "100%", border: "none", outline: "none", color: "white"}} ref={inputRef} />
            <IconButton sx={{ bgcolor: "white", color: "black", mx: 1}} onClick={handleSubmit}><IoMdSend/></IconButton>
          </div>
      </Box>
    </Box>
  )
}

export default Chats
