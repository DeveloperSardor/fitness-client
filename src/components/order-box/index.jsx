import React from 'react'
import './style.scss'
import productImg from '../../assets/images/product.png'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({order, productIndex, reload}) => {
  const navigate = useNavigate()
const UserDatas = JSON.parse(localStorage.getItem('userDatas'));
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


async function deleteProductFromOrdersHandler(){
  try {
    const {data} = await axios.put(`${BACKEND_URL}/orders/delete-product`, {
      orderId : order?.product.orderId,
      productId : order._id
    }, {headers : {token : UserDatas?.token}})  
    if(data.success){
      toast.success(`Muvofaqqiyatli o'chirildi`)
      reload()
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


  return (
    <div className='order-card position-relative p-2 pb-5 cursor-pointer' >
      <img src={order?.product.img} alt='product image' onClick={()=>{order?.product.type_of == 'equipment' ? navigate(`/equipments/${order?.product._id}`) : navigate(`/products/${order?.product._id}`)}} className='main_img rounded w-[310px] h-[250px]'/>
      <div className='datas mt-1'>
        <div className='item flex items-center justify-between'>
            <p className='title'>{order?.product.title}</p>
            <p className='company'>{order?.product.company}</p>
        </div>
        <div className='item flex items-center justify-between'>
            <p className='category'>{order?.product.category}</p>
            <p className='price'>{order?.product.price} $</p>
        </div>
      </div>
      <div className='btns mt-2  position-absolute flex gap-4 items-center'>
            <img src={deleteIcon} className='del' onClick={()=>deleteProductFromOrdersHandler()}/>
        </div>
    </div>
  )
}

export default ProductCard

