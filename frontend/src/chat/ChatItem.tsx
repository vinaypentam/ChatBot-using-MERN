import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../context/Authcontext'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function stringToBlock(message: string){
  const blocks = message.split("```");
  return blocks;
}
function isCodeBlock(message: string){
  if(message.includes(";") 
    || message.includes("{")
  || message.includes("}")
  || message.includes("[")
  || message.includes("]")
  || message.includes("(")
  || message.includes(")")){
    return true;
  }
  return false;
}
function ChatItem({role, content}: {content: string, role: "assistant" | "user"}) {
  const auth = useAuth();
  const messageBlocks = stringToBlock(content);
  return role === "assistant" ?(
    <Box sx={{bgcolor: "#004d5612", display: "flex", gap: 3, my:2, p:2, borderRadius: 3}}>
        <Avatar sx={{ml: "0" }}>
            <img src="openai.png" alt="openai" width={"30px"}/>
        </Avatar>
        <Box>
            {!messageBlocks && (<Typography sx={{fontSize: "20px"}}>{content}</Typography>)}
            {messageBlocks && messageBlocks.length && messageBlocks.map((block) => isCodeBlock(block) ?
            <SyntaxHighlighter style={coldarkDark} language= {block.split(" ")[0]}>{block}</SyntaxHighlighter>
            :
            <Typography sx={{fontSize: "20px"}}>{block}</Typography>
            )}
        </Box>
    </Box>
  ):(
      <Box sx={{bgcolor: "#004d56", display: "flex", gap: 3, p:2,borderRadius: 3}}>
          <Avatar sx={{ml: "0" , bgcolor: "white", color: "black", fontWeight: "700"}}>
          {auth?.user?.name[0]}
          </Avatar>
          <Box sx={{alignContent: "center"}}>
            {!messageBlocks && (<Typography sx={{fontSize: "20px"}}>{content}</Typography>)}
            {messageBlocks && messageBlocks.length && messageBlocks.map((block) => isCodeBlock(block) ?
            <SyntaxHighlighter style={coldarkDark} language= {block.split(" ")[0]}>{block}</SyntaxHighlighter>
            :
            <Typography sx={{fontSize: "20px"}}>{block}</Typography>
            )}
        </Box>
      </Box>
  )
}

export default ChatItem
