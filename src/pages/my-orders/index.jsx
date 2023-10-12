import React, { useEffect, useState } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import ProfilePicture from '../../assets/images/profilePicture.png';
import OrderBox from '../../components/order-box';
import RightHeader from '../../components/right-header';
import toast from 'react-hot-toast';
import axios from 'axios';
import EquipmentCard from '../../components/equipment-card';
import ProductCard from '../../components/product-card';
import Skeleton from '../../components/skeleton';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const limit = 6;
    const [count, setCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [myOrderLoad, setMyOrderLoad] = useState(false);
  document.title = 'Buyurtmalarim'

// const  modifiedProducts =   myOrders.flatMap(order=>{
//   return  order.product[0].products.map(product=>{
//     return {
//       // product : {},
//       totalSum : order.products[0].totalSum
//     }
//   })
// })}





function transformOrders(orders) {
  const transformedProducts = [];

  orders.forEach(order => {
    order.products.forEach(product => {
            transformedProducts.push({
        count: product.count,
        _id: product._id,
        product: {
          _id: product._id,
          title: product.title,
          type_of : product.type_of,
          category: product.category,
          company: product.company,
          img : product.img,
          orderId : product.orderId,
          price : product.price
        }
      });
    });
  });

  return transformedProducts;
}



function addOrderIdToProducts(orders) {
  return orders.map(order => {
    const orderId = order._id;
    const productsWithOrderId = order.products.map(product => ({
      ...product.product,
      orderId: orderId 
    }));

    return {
      ...order,
      products: productsWithOrderId
    };
  });
}

  async function GetMyOrders() {
    try {
      setMyOrderLoad(true);
      const { data } = await axios.get(
        `${BACKEND_URL}/orders/my-orders?page=${currentPage}`,
        { headers: { token: userDatas?.token } }
      );
      if (data.success) {
        const updateOrders = addOrderIdToProducts(data.data);
        setMyOrders(transformOrders(updateOrders))
        setCount(data.count);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setMyOrderLoad(false);
    }
  }

  useEffect(()=>{
      GetMyOrders()
  },[currentPage])

  return (
    <div className='orders-page page'>
         <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Buyurtmalar</h3>
    <RightHeader/>
    </div>
    
      <div className='products_wrp bg-white p-2 rounded-3 px-4 flex items-center gap-5 pb-5 flex-wrap mt-4'>
      {!myOrders?.length ? (
          <h2 className="not_found">Buyurtmalar mavjud emas!</h2>
        ) : (
          ""
        )}
        {myOrderLoad && !myOrders.length ? <Skeleton /> : ""}
        {myOrders?.length ?
          myOrders?.map((el, idx) =>   <OrderBox productIndex={idx} reload={GetMyOrders}  order={el} key={idx}/>) : ""}
        
      </div>
      <div className='bottom p-2 d-flex align-items-center justify-content-between'>
      <div className='buttons'>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`${number === currentPage ? "active" : ""}`}
              >
                {number}
              </button>
            )
          )}
      </div>
          </div>
    </div>
  )
}

export default MyOrders;







