import React, { useEffect, useState } from "react";
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import userImg from "../../assets/images/customer.png";
import userIcon from "../../assets/images/user-icon.png";
import calendarIcon from "../../assets/images/teacher-need-2.png";
import phoneIcon from "../../assets/images/phone-icon.png";
import { useNavigate, useParams } from "react-router-dom";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";

const TeacherById = () => {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


    document.title = "Ustoz"

    const {id} = useParams();
    const UserDatas = JSON.parse(localStorage.getItem('userDatas'))


    const [teacher, setTeacher] = useState(null);

    function convertToRealTime(isoDate) {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
    const birth_date = convertToRealTime(teacher?.birth_date);
    const getFullYear = new Date().getFullYear();

async function GetTeacher(){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/users/teachers/${id}`, {headers : {token : UserDatas?.token}})
    if(data.success){
      setTeacher(data.data)
    }else{
      throw new Error(`Xatolik yuz berdi`)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

    useEffect(()=>{
    GetTeacher()
    }, [])

  return (
    <div className="teacherById-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Ustoz</h3>
        <RightHeader/>
      </div>

      <section className="data-box">
        <div className="top">
          <h3 className="headings">Ustoz ma'lumotlari</h3>
        </div>
        <div className="info_box flex flex-column gap-3 px-3">
          <div className="first flex gap-5">
            <img src={teacher?.img} alt="user image" className="user_img" />
            <div className="right_box flex flex-column  p-2 w-[55%] ">
              <p className="createdAt">{convertToRealTime(teacher?.createdAt)}</p>
              <div className="name_id flex justify-between">
                <h3 className="name">{teacher?.lastname} {teacher?.firstname}</h3>
                <p className="_id">ID {id}</p>
              </div>
              <p className="age">{getFullYear - birth_date.slice(birth_date.length - 4)} yosh</p>
              <div className="gender_gmail flex items-center justify-between">
                <p className="gender text-capitalize">{teacher?.gender}</p>
                <p className="gmail">{teacher?.gmail}</p>
              </div>
              <div className="bottom flex items-center justify-between">
                <div className="item flex gap-2">
                  <img src={userIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Toifa</p>
                    <p className="num">{teacher?.category == 'birinchi' ? "I" : teacher?.category == 'ikkinchi' ? "II" : teacher?.category =='uchinchi' ? "III" : "IV"}</p>
                  </div>
                </div>
                <div className="item flex gap-2">
                  <img src={calendarIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">kuni</p>
                    <p className="num">{teacher?.days == "toq"
                        ? "Du Chor Ju"
                        : "Se Pay Sha"}</p>
                  </div>
                </div>
                <div className="item flex gap-2">
                  <img src={phoneIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Tel:</p>
                    <p className="num">+998{teacher?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="second_desc">
            <p className="desc">{teacher?.info}</p>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default TeacherById;
