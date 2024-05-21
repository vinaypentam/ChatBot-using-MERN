import React from 'react'
import { Box } from '@mui/material'
import TypeAnimat from '../components/TypeAnimat'

function Home() {
  return (
    <Box sx={{alignItems: "center", width: "100%", height: "80vh", display: "flex", }}>
      <Box sx= {{width: "40%", my: "auto"}}>
        <TypeAnimat/>
      </Box>
      <Box sx={{width: "100%", height: "100%", justifyItems: "center", alignItems: "center", display: "flex",gap: 4, flexDirection: "column", padding:"16px", m:"auto"}}>
        <img src="openai.png" alt="openai" className='image-inverted rotate' style={{width:"100px", height: "100px"}}/>
        <img src="chat.png" alt="chat" style={{width:"80%", height: "80%", borderRadius: 10, boxShadow: "-5px -5px 105px #64f3d5",}}/>

      </Box>
    </Box>
  )
}

export default Home
