import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, Firebasecontext } from '../../store/FirebaseContext';
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name,setName]  = useState('')
  const [category,setCategory]  = useState('')
  const [price,setPrice]  = useState('')
  const [image,setImage]  = useState('')
  const {db} = useContext(Firebasecontext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();
  const handleSubmit = async () => {
    console.log(image,"imageeeeeee")
    const storageRef = ref(getStorage(), `image/${image.name}`);


    const blob = new Blob([image], { type: image.type });
    console.log(storageRef,"referenceeeee")
  
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(snapshot.ref);
      const productsCollectionRef = collection(db, 'products');
      const newProduct = {
        name,
        category,
        price,
        imageUrl,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
      };
      await addDoc(productsCollectionRef, newProduct);
      setName('');
    setCategory('');
    setPrice('');
    setImage('');

     navigate('/')

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}

            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"  value={price}
             onChange={(e)=>{
                setPrice(e.target.value)
              }}/>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):null}></img>
            <br />
            <input onClick={(e)=>{
                 setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
