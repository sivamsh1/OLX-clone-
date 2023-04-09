import React, { useContext } from 'react';
import { useState } from 'react';
import db from '../../FireBase/config';
import Logo from '../../olx-logo.png';
import { Firebasecontext } from '../../store/FirebaseContext';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';





export default function Signup() {
const navigate = useNavigate();
const auth = getAuth();
const firestore = getFirestore();  
const [userName,setUserName] = useState('');
const [email,setEmail] = useState('');
const [phone,setPhone] = useState('');
const [password,setPassword] = useState('');
const {db} = useContext(Firebasecontext)

const signupDatas = (e)=>{
  e.preventDefault()
  

  
 try {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: userName
      }).then(()=>{
        const usersCollectionRef = collection(firestore, "users");
        const data = {
          id:user.uid,
          userName : userName,
          phone:phone
        };
        addDoc(usersCollectionRef,data).then((docRef)=>{
          console.log("Document added with id :", docRef.id)
        })
         
      }).then(()=>{
        navigate("/login")

      })
    })
    
} catch (error) {
  console.log(error, "errorrrr");
}

}


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
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
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br />
          <br />
          <button onClick={signupDatas} >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
