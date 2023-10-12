import React, { useEffect, useState } from "react";
import "./style.scss";

const CardBox = ({ el }) => {
  let productsCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

  useEffect(() => {}, [productsCart]);

  

  function deleteProductFromCarts(id) {
    const updated = productsCart.filter((el) => el._id != id);
    productsCart = updated;
    localStorage.setItem("cartProducts", JSON.stringify(updated));
    location.reload();
  }

  function plusFunc(el) {
    const updated = productsCart.find((e) => e._id == el._id);
    updated.countOne += 1;
    updated.total += updated.price;

    console.log(productsCart);
    localStorage.setItem("cartProducts", JSON.stringify(productsCart));
    window.location.reload();
  }

  function minusFunc(el) {
    if (el.countOne === 1) {
      deleteProductFromCarts(el._id);
      localStorage.setItem(`cartProducts`, JSON.stringify(productsCart));
    }
    const updated = productsCart.find((e) => e._id == el._id);
    updated.countOne -= 1;
    updated.total -= updated.price;

    localStorage.setItem("cartProducts", JSON.stringify(productsCart));
    location.reload()
  }

  return (
    <div className="prd_box flex items-center gap-5 ">
      <div className="left flex gap-3 items-center w-[65%]">
        <i
          class="fa-solid fa-x delete fs-5 text-danger"
          onClick={() => deleteProductFromCarts(el._id)}
        ></i>
        <img src={el.img} className="w-[90px] rounded-4" />
        <div className="texts">
          <p className="title">{el.title}</p>
          <p className="category">{el.category}</p>
        </div>
        <div className="counter gap-2 ms-2 flex items-center">
          <button className="minus" onClick={() => minusFunc(el)}>
            -
          </button>
          <p className="count">{el.countOne}</p>
          <button className="plus" onClick={() => plusFunc(el)}>
            +
          </button>
        </div>
      </div>
      <div className="right">
        <p className="price">
          <span>$</span> {el.countOne * el.price}
        </p>
      </div>
    </div>
  );
};

export default CardBox;
