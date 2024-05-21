import './App.css'
import Header from './components/Header'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useAuth } from './context/Authcontext'
import Chats from './pages/Chats'

function App() {

  const auth = useAuth();

  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        {auth?.isLoggedIn && auth.user && 
        <Route path='/chat' element = {<Chats/>}/>
        }
      </Routes>
    </main>
  )
}

export default App
