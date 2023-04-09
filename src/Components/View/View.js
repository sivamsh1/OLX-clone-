import React, { useContext, useEffect, useState } from 'react';
import { PostContext } from '../../store/postContext';
import { Firebasecontext } from '../../store/FirebaseContext';
import { doc, collection, query, where, onSnapshot } from "firebase/firestore";


import './View.css';
function View() {
const [userDetails,setUserDetails,] = useState()
const {postDetails} = useContext(PostContext)
const {db} = useContext (Firebasecontext)

useEffect(() => {


  console.log(postDetails,"postDetails")

  const { id } = postDetails;
  // const id = "45QhamM3mqViOH8k2Qz"


  const usersCollection = collection(db, "users");

  

  const userQuery = query(usersCollection, where("id", "==", id));


  const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
    const userDetails = querySnapshot.docs.map((doc) => doc.data());
    console.log(userDetails,"userDetailsssssssssssssss")  
    setUserDetails(userDetails);
  });






  return () => unsubscribe();
}, [postDetails, setUserDetails, db]);



  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller name</p>
          <p>Sivamsh</p>
          <p>9744707392</p>
        </div>
      </div>
    </div>
  );
}
export default View;
