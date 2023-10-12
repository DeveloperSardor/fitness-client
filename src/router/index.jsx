import React from "react";

import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Verification from "../pages/verification";
import Layout from "../pages/layout";
import MyProfile from "../pages/my-profile";
import Teachers from "../pages/teachers";
import Equipments from '../pages/equipments'
import Products from "../pages/products";
import Statictics from "../pages/statictics";
import QuestionAnswer from "../pages/question-answer";
import MyOrders from "../pages/my-orders";
import TeacherById from "../pages/teacherById";
import EquipmendById from "../pages/equipmentById";
import ProductById from "../pages/productById";
import Cart from '../pages/cart'

const Router = ()=>{
    return( 
        <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<MyProfile/>}/>
            <Route path="/my-profile" element={<MyProfile/>}/>
            <Route path="/teachers" element={<Teachers/>}/>
            <Route path="/equipments" element={<Equipments/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/statistics" element={<Statictics/>}/>
            <Route path="/question-answer" element={<QuestionAnswer/>}/>
            <Route path="/my-orders" element={<MyOrders/>}/>
            <Route path="/teachers/:id" element={<TeacherById/>}/>
            <Route path="/equipments/:id" element={<EquipmendById/>}/>
            <Route path="/products/:id" element={<ProductById/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/verification" element={<Verification/>}/>
        </Routes>
    )
}
   


export default Router;