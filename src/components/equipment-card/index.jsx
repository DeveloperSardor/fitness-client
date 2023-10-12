import React from 'react'
import './style.scss'
import EquipmentImg from '../../assets/images/equipment.png';
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import { useNavigate } from 'react-router-dom';

const EquipmentCard = ({equipment}) => {
  const navigate = useNavigate();
  return (
    <div className='equipment-card cursor-pointer p-2 pb-3 position-relative ' onClick={()=>navigate(`/equipments/${equipment._id}`)}>
      <div className='body  rounded bg-light'>
       
        <img src={equipment?.img} alt='equipment' className='main_img'/>
      </div>
      <div className='eq_info flex mt-1 flex-column gap-1'>
         <div className='item flex justify-between items-center'>
            <p className='title'>{equipment?.title}</p>
            <p className='company'>{equipment?.company}</p>
         </div>
         <div className='item flex justify-between items-center'>
            <p className='for'>{equipment?.category}</p>
            <p className='price'>{equipment?.price} $</p>
         </div>
      </div>
    </div>
  )
}

export default EquipmentCard
