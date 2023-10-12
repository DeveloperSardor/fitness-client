import React from 'react'
import './style.scss'
import productImg from '../../assets/images/product.png'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({product}) => {
  const navigate = useNavigate();

  return (
    <div className='product-card position-relative cursor-pointer p-2 pb-5' onClick={()=>navigate(`/products/${product._id}`)}>
      <img src={product?.img} alt='product image' className='main_img rounded w-[310px] h-[250px]'/>
      <div className='datas mt-1'>
        <div className='item flex items-center justify-between'>
            <p className='title'>{product?.title}</p>
            <p className='company'>{product?.company}</p>
        </div>
        <div className='item flex items-center justify-between'>
            <p className='category'>{product?.category}</p>
            <p className='price'>${product?.price} $</p>
        </div>
      </div>
     
    </div>
  )
}

export default ProductCard
