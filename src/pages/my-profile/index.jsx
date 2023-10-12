import React, { useEffect, useState } from "react";
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import UserIcon from "../../assets/images/user-icon.png";

import userImg from "../../assets/images/customer.png";
import userIcon from "../../assets/images/user-icon.png";
import calendarIcon from "../../assets/images/teacher-need-2.png";
import phoneIcon from "../../assets/images/phone-icon.png";
import { useNavigate } from "react-router-dom";
import cartImg from "../../assets/images/cart.png";
import io from "socket.io-client";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";

const MyProfile = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const UserDatas = JSON.parse(localStorage.getItem("userDatas"));
  const navigate = useNavigate();
  const [userTeacher, setUserTeacher] = useState(null);

  useEffect(() => {
    if (UserDatas?.role == "customer") {
      getTeacher(UserDatas?.teacher);
    } else {
      return;
    }

    const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log("Ulandi");
    });
    socket.on("disconnect", () => {
      console.log("Ulanish tugatildi");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function convertToRealTime(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  const birth_date = convertToRealTime(UserDatas?.birth_date);
  const getFullYear = new Date().getFullYear();

  async function getTeacher(id) {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/users/teachers/${id}`, {
        headers: { token: UserDatas?.token },
      });
      if (data.success) {
        setUserTeacher(data.data);
      } else throw new Error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  document.title = "Mening profilim";
  return (
    <div className="customerById-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">
          {" "}
          {UserDatas?.role == "customer" ? "Mijoz" : "Ustoz"}{" "}
        </h3>
        <RightHeader />
      </div>

      <section className="data-box">
        <div className="top">
          <h3 className="headings">
            {UserDatas?.role == "customer" ? "Mijoz" : "Ustoz"} ma'lumotlari
          </h3>
        </div>
        <div className="info_box flex flex-column gap-3 px-3 ">
          <div className="first flex gap-5 ">
            <img src={UserDatas?.img} alt="user image" className="user_img" />
            <div className="right_box flex flex-column position-relative p-2 w-[55%] ">
              <p className="createdAt position-absolute">20.02.2023</p>
              <div className="name_id mt-3 flex justify-between">
                <h3 className="name ">
                  {UserDatas?.lastname} {UserDatas?.firstname}
                </h3>
                <p className="_id">ID {UserDatas?._id}</p>
              </div>
              <p className="age">
                {getFullYear - birth_date.slice(birth_date.length - 4)} yosh
              </p>
              <div className="gender_gmail flex items-center justify-between">
                <p className="gender text-capitalize">{UserDatas?.gender}</p>
                <p className="gmail">{UserDatas?.gmail}</p>
              </div>
              <div className="bottom flex items-center justify-between">
                {UserDatas?.role != "teacher" ? (
                  <div className="item flex gap-2">
                    <img src={userIcon} alt="user_icon" />
                    <div className="txts">
                      <p className="cat">Ustoz</p>
                      <p className="num">
                        {userTeacher?.lastname} {userTeacher?.firstname}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="item flex gap-2">
                    <img src={UserIcon} alt="user icon" className="cat_img" />
                    <div className="txts">
                      <p className="cat">Toifa</p>
                      <p className="num">IV</p>
                    </div>
                  </div>
                )}

                <div className="item flex gap-2">
                  <img src={calendarIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">kuni</p>
                    <p className="num">
                      {userTeacher?.days == "toq"
                        ? "Du Chor Ju"
                        : "Se Pay Sha"}
                    </p>
                  </div>
                </div>
                <div className="item flex gap-2">
                  <img src={phoneIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Tel:</p>
                    <p className="num">+998{UserDatas?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
