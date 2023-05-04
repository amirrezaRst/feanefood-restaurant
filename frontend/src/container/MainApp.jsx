import React, { useContext, useEffect, useState } from 'react';

import { redirect, Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import About from '../components/aboutPage/About';
import Home from '../components/homePage/Home';
import MainLayout from '../components/layouts/MainLayout';
import Menu from '../components/menuPage/Menu';
import Contact from "../components/contactPage/Contact"
import LogIn from '../components/register/LogIn';
import SignUp from '../components/register/SignUp';
import SingleFoodPage from '../components/singlePages/SingleFoodPage';
import Cart from '../components/cart/Cart';
import AuthorizationContext from '../services/AuthorizationContext';
import Profile from '../components/profilePage/Profile';
import Offer from '../components/offerPage/Offer';
import NotFound from '../components/NotFound';
import Admin from '../components/admin/Admin';
import NewUser from '../components/admin/NewUser';
import VerifyPaymentPage from '../components/paymentPage/VerifyPaymentPage';
import Payment from '../components/cart/Payment';


const MainApp = () => {

    useEffect(() => {
        if (localStorage.getItem("x-auth-token")) {
            getUserAuthorization();
        }
    }, [])

    const [fullName, setFullName] = useState(null)
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState(null)

    const context = useContext(AuthorizationContext)


    const getUserAuthorization = async () => {

        await axios.get("http://localhost:3000/auth", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            context.FullName = res.data.fullName
            context.role = res.data.role
            context.email = res.data.email
            setFullName(res.data.fullName)
            setRole(res.data.role)
            setEmail(res.data.email)

            console.log(`fullName : ${context.FullName}`);
            console.log(`role : ${context.role}`);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <AuthorizationContext.Provider value={{ FullName: fullName, setFullName: setFullName, role: role, setRole: setRole, email: email, setEmail: setEmail }}>

            <MainLayout>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contactUs" element={<Contact />} />
                    <Route path="/login" element={!localStorage.getItem("x-auth-token") ? <LogIn /> : <NotFound />} />
                    <Route path="/signup" element={!localStorage.getItem("x-auth-token") ? <SignUp /> : <NotFound />} />
                    <Route path='/singlePage/*' element={<SingleFoodPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/offer" element={<Offer />} />

                    <Route path="/dashboard" element={role == "admin" ? <Admin /> : <NotFound />} />

                    <Route path='/payment' element={<Payment />} />
                    <Route path='/verifyPayment' element={<VerifyPaymentPage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </MainLayout>


        </AuthorizationContext.Provider>
    );
}

export default MainApp;