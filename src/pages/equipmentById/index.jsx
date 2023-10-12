import React, { useEffect, useState } from 'react'
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import countImg from '../../assets/images/count.png'
import priceImg from '../../assets/images/price.png'
import calendarIcon from "../../assets/images/teacher-need-2.png";
import equipmentImg from '../../assets/images/equipment.png'
import { useNavigate, useParams } from 'react-router-dom';
import RightHeader from '../../components/right-header';
import toast from 'react-hot-toast';
import axios from 'axios';


const EquipmendById = () => {
    document.title = "Jihoz"
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const [isExist, setIsExist] =useState(false)

    function addToCart(){
      cartProducts.push({...equipment, countOne : 1, total : equipment?.price})
      setIsExist(true)
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    }

    const {id} = useParams();

    const UserDatas = JSON.parse(localStorage.getItem('userDatas'))
    const [equipment, setEquipment] = useState(null);

    async function GetEquipment(){
      try {
        const {data} = await axios.get(`${BACKEND_URL}/products/equipments/${id}`, {headers : {token : UserDatas?.token}})
        if(data.success){
          setEquipment(data.data)
        }else{
          throw new Error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    

    const isExistInCart = cartProducts.some(el=>el._id === id)

    useEffect(()=>{
      const isExistInCart = cartProducts.some(el=>el._id === id)
      if(isExistInCart){
         setIsExist(true)
      }else{
       setIsExist(false)
      }
    }, [])

    useEffect(()=>{
      GetEquipment()
      }, [])

  return (
    <div className='equipmendById-page page'>
      
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Jihoz</h3>
        <RightHeader/>
      </div>


      <section className="data-box">
        <div className="top">
          <h3 className="headings">Jihoz ma'lumotlari</h3>
        </div>
        <div className="info_box flex flex-column gap-3 px-3">
          <div className="first flex gap-5">
            <img src={equipment?.img} alt="user image" className="user_img" />
            <div className="right_box flex flex-column  p-2 w-[55%] ">
                <h3 className="name">{equipment?.title}</h3>
                <p className="type">{equipment?.category}</p>
             
              <p className="company">{equipment?.company}</p>
              
              <div className="bottom flex items-center gap-5">
                <div className="item flex gap-2">
                <div className="count flex items-center justify-center">
                <p>S</p>
                 </div>
                  <div className="txts">
                    <p className="cat">Soni</p>
                    <p className="num">{equipment?.count}</p>
                  </div>
                </div>
              
                <div className="item flex gap-2">
                  <img src={priceImg} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Narxi</p>
                    <p className="num price">{equipment?.price} $</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="second_desc">
            <p className="desc">{equipment?.desc}</p>
          </div>
      </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            <button className="add-cart" onClick={()=>!isExistInCart && addToCart()}>{isExist ? "✅" : "savatga qo'shish"}</button>
            <button className="buy">sotib olish</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default EquipmendById
