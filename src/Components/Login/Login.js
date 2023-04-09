import React, { useState,useContext } from 'react'; 
import Logo from '../../olx-logo.png';
import { Firebasecontext } from '../../store/FirebaseContext';
import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Login() {
const navigate = useNavigate()
const auth = getAuth();
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const {db} = useContext(Firebasecontext)

const handleSubmit = (e)=>{
  e.preventDefault()  
  signInWithEmailAndPassword(auth,email,password).then(()=>{
    navigate("/")

  }).catch((err)=>{
     alert(err.message)
  })

}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}  >
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>{ setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={e=>{ setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
