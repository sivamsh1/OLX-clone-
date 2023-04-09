import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import { Firebasecontext } from '../../store/FirebaseContext';
import './Post.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { PostContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';



function Posts() {
const navigate = useNavigate();

  const  {setPostDetails} = useContext(PostContext) 
  const [products,setProducts] = useState([]) 

  useEffect(()=>{
    
    const db = getFirestore();
    const fetchProducts = async () => {
    console.log("okkkkkkk")
    console.log(products,"productsssssssss")

      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
       
      const allProducts = productsSnapshot.docs.map((products)=>{
        return {
          ...products.data(),
          id:products.id
        }


      })

    setProducts(allProducts)   
 
    };
    fetchProducts();
  },[]);



console.log(products)

const array = [1,2,3,4,5]

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

{   products.map((product)=>{
    

    return  (

                  <div
                    className="card"
                    onClick={()=>{
                      setPostDetails(product)
                      navigate('/viewPost')

                    }}
                  >
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.imageUrl} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name"> YAMAHA</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>
         )
                  
     })  
     
     }


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
