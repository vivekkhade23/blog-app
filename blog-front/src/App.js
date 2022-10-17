import './App.css';
// import LoginGoogle from './login/loginGoogle';
// import LogoutGoogle from './login/logoutGoogle';
// import {gapi} from "gapi-script"
import { useEffect } from 'react';
import Login from './login/Login';
import Navbar from './components/Navbar/Navbar';
// const clientId="309173535315-7c7kkg6evrn5qpmpmfm36lgu5lm4httn.apps.googleusercontent.com";



function App() {

// useEffect(()=>{
//   function Start(){
//     gapi.client.init({
//       clientId:clientId,
//       scope:""
//     })
//   }
//   gapi.load("client:auth2",Start)
// })

  return (
    <div className="App">
   <Navbar/>
 <Login/>
    </div>
  );
}

export default App;
