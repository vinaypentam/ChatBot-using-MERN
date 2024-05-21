import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

function Logo() {
    return (
        <div style={{
            display: "flex",
            marginRight: "auto",
            alignItems: "center",
            gap: "15px"
        }}>

            <Link to={"/"}>
                <img src="openai.png" alt="" width={"30px"} height={"30px"} className='image-inverted' />
            </Link>
            <Typography sx={{ display: { md: "block", sm: "none", xs: "none" }, marginRight: "auto", fontWeight: "800", textShadow:"-5px -5px 105px #64f3d5", letterSpacing:"2px", fontSize: 20}}>
                MERN-gpt
            </Typography>

        </div>
    )
}

export default Logo
