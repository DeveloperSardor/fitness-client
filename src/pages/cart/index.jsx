import React from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import ProfilePicture from '../../assets/images/profilePicture.png';
import OrderBox from '../../components/order-box';
import CardBox from '../../components/cart-box';
import toast from 'react-hot-toast';
import axios from 'axios';
import RightHeader from '../../components/right-header';

const Cart = () => {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const UserDatas = JSON.parse(localStorage.getItem('userDatas'));

    let productsCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  document.title = 'Savat'


  async function addOrderHandler(){
    try {
      const prds = productsCart.map((item) => ({
        count: item.countOne,
        product: item._id,
      }))
      const {data} =await axios.post(`${BACKEND_URL}/orders/add-order`, {
       totalSum : getTotalFromObjectsArray(productsCart),
       products : prds
      }, {headers : {token : UserDatas?.token}})
      if(data.success){
        productsCart = [];
        toast.success(data.message)
        localStorage.setItem('cartProducts', JSON.stringify(productsCart));
        location.reload()
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  function getTotalFromObjectsArray(arr) {
    let total = 0;
    
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      
      if ('total' in obj) {
        total += obj.total;
      }
    }
    
    return total;
  }


  

  return (
    <div className='cart-page page'>
         <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Savat</h3>
    <RightHeader/>
    </div>
    <div className='all_wrp flex gap-5 '>
      <div className='products_wrp flex flex-column w-[55%] bg-white p-2 rounded-3 px-4  gap-5 pb-5 flex-wrap mt-4'>
      {!productsCart.length ? (<h2 className='not_found'>Savatda maxsulotlar mavjud emas!</h2>) : ""}
      {productsCart.length ? productsCart?.map((el, idx)=> 
     <CardBox el={el} key={idx} />
      
      ) : ""}
       
        
      </div>
         <div className='checkout h-[250px] flex flex-column gap-2 mt-4 rounded-3 w-[35%] p-3 bg-white'>
         <div className='item flex items-center justify-between'>
          <p  className='first'>Maxsulot narxi</p>
          <p className='last'>${getTotalFromObjectsArray(productsCart)}</p>
         </div>
         <div className='item flex items-center justify-between pb-2 border-bottom'>
          <p className='first'>Yetkazib berish</p>
          <p className='last'>{productsCart.length ? '$20' : "$0"}</p>
         </div>
         <div className='total flex items-center justify-between'>
          <p className='first'>Total</p>
          <p className='last'>{productsCart.length ? `$${getTotalFromObjectsArray(productsCart) + 20}` : "$0" }</p>
         </div>
         <button className='checkout_btn' onClick={productsCart?.length && addOrderHandler}>Check out</button>
         </div>

    </div>
      {/* <div className='bottom p-2 d-flex align-items-center justify-content-between'>
            <p className='pag_txt'>1-9 dan 36ta</p>
            <div className='buttons'>
              <button className='active'>1</button>
              <button>2</button>
              <button>3</button>
            </div>
          </div> */}
    </div>
  )
}

export default Cart;
