import React from 'react'
import { BiFontFamily } from 'react-icons/bi';
import { Link } from 'react-router-dom'

type Props = {
    to: string,
    bg: string,
    value: string,
    color: string,
    onclick: () => Promise<void>
};

function Navigationlink(props:Props) {
  return (
    <div>
      <Link to={props.to} style={{backgroundColor: props.bg, color: props.color, textDecorationLine: "none"}} className="nav-link" onClick={props.onclick}>{props.value}</Link> 
    </div>
  )
}

export default Navigationlink
