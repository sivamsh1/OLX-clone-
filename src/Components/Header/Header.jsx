import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';



function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">

          {user?<span>{ user?user.displayName: 'Login'}</span>:
          <span onClick={()=>{
            navigate('/login')
          }} >{ user?user.displayName: 'Login'}</span>

       }

          <hr />
        </div>
   
        { user && <span  onClick={()=>{
           signOut(auth)
          navigate("/login")

        }} >Logout</span>}

        <div onClick={()=>{
              navigate('\sell')
            }}  className="sellMenu">
          <SellButton  ></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>{
              navigate('\sell')
            }} >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
