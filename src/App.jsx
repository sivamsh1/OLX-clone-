import React, { useContext, useEffect } from 'react';
import './App.css';
import{BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import Login from './Pages/Login';
import sell from './Pages/Create'
import detail from './Pages/ViewPost'
import { AuthContext, Firebasecontext } from './store/FirebaseContext';
import { getAuth } from 'firebase/auth';
import Post from './store/postContext';

function App() {
  
  const {setUser} = useContext(AuthContext)      
  const {db} = useContext(Firebasecontext)
  const auth = getAuth();
  useEffect(()=>{
           auth.onAuthStateChanged((user)=>{
            setUser(user)
           })
      })
  return (

    <div>

<Post>
        <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/signUp" Component={SignupPage} />
          <Route path="/login" Component={Login} />
          <Route path="/sell" Component={sell}/>
          <Route path="/viewPost" Component={detail}/>
        </Routes>
      </Router>

</Post>
    </div>
  );
}

export default App;
