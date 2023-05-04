import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

import SingleBuyCart from './SingleBuyCart';

import AuthorizationContext from "../../services/AuthorizationContext"
import FoodContext from '../../services/FoodContext';



const Cart = () => {

    const context = useContext(AuthorizationContext);
    const foodContext = useContext(FoodContext);

    const [upload, setUpload] = useState(false)
    const [totalPrice, setTotalPrice] = useState(null)

    const navigate = useNavigate();



    useEffect(() => {
        getSingleUser()
        // console.log(context.cart);
    }, [context.email])

    const getSingleUser = async () => {
        setTimeout(async () => {
            if (context.email) {
                await axios.get(`http://localhost:3000/api/usersEmail/${context.email}`).then(res => {
                    console.log(res);
                    context.id = res.data._id

                    context.cart = res.data.cart
                    setUpload(true)
                    context.setCart(res.data.cart)
                    context.setId(res.data._id)

                }).catch(err => {
                    console.log(err);
                })
            }
        }, 1000);
    }

    useEffect(() => {

        if (foodContext.totalPrice == null) {
            setInterval(() => {
                setTotalPrice(foodContext.totalPrice);
            }, 100);
        }
    }, [foodContext.totalPrice])


    const getPaymentPage = () => {
        navigate("/payment", {
            state: {
                totalPrice,
                userCart: context.cart
            }
        })
    }

    const showResult = () => {
        console.log(foodContext.totalPrice);
    }


    return (

        <React.Fragment>

            <header class="header_section" style={{ background: "#14181b" }}>
                <div class="container">

                    <Helmet>
                        <title>Feane - Cart</title>
                    </Helmet>

                    <nav class="navbar navbar-expand-lg custom_nav-container ">
                        <Link to="/" class="navbar-brand">
                            <span>
                                Feane
                            </span>
                        </Link>

                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class=""> </span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav  mx-auto ">
                                <li class="nav-item active">
                                    <NavLink class="nav-link" exact to="/" ><span className='mx-3' style={{ color: "#fffaf2" }}>Home</span> <span class="sr-only">(current)</span></NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink class="nav-link navbar-text" to="/menu" ><span className="mx-3" style={{ color: "#fffaf2" }}>Menu</span></NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink class="nav-link navbar-text" to="/about" ><span className="mx-3" style={{ color: "#fffaf2" }}>About</span></NavLink>
                                </li>
                                <li class="nav-item">
                                    <NavLink class="nav-link navbar-text" to="/contactUs" ><span className="mx-3" style={{ color: "#fffaf2" }}>Contact us</span></NavLink>
                                </li>
                            </ul>
                            <div class="user_option">
                                <Link to={context.role == "admin" ? "/dashboard" : localStorage.getItem("x-auth-token") == null ? "/login" : "/profile"}>
                                    <i class={context.role == "admin" ? "fa fa-user-shield" : "fa fa-user"} aria-hidden="true" style={{ color: "#fffaf2" }}></i>
                                </Link>
                                <Link to="/cart" href="#" >
                                    <i class="fa-solid fa-cart-shopping" style={{ color: "#ffbe33" }}></i>
                                </Link>
                                <form class="form-inline">
                                    <button class="btn  my-2 my-sm-0 nav_search-btn" type="submit">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>


            {localStorage.getItem("x-auth-token") ?
                <main className='container' style={{ marginTop: "7vh", marginBottom: "10vh" }}>
                    <section class="food_section">
                        <div class="container">

                            <p className="h2 mb-5" onClick={showResult}>Your shopping cart</p>


                            <div class="filters-content">
                                <div class="row grid">

                                    {upload == true ? context.cart.map(item => <SingleBuyCart foodId={item._id} userId={context.id} foodName={item.name} foodCount={item.count} foodPrice={item.price} foodImage={item.pic} />) : null}
                                    {upload == true && context.cart.length == 0 ? <h3 className='mt-5 mb-0'>There is no food in your cart</h3> : null}
                                </div>
                            </div>

                            <div className="mt-5 d-flex justify-content-between">

                                {/* <p className="h2" style={{fontWeight:"600"}}><span>Total Price : </span><span className='' style={{color:"#ffc14f"}}>{totalPrice}$</span></p> */}
                                <p className="h2" style={{ fontWeight: "600" }}><span>Total Price : </span><span className='' style={{ color: "#eaaa2a" }}>{totalPrice}$</span></p>
                                <button className="btn btn-lg text-white" style={{ background: "#eaaa2a" }} onClick={getPaymentPage}>Payment</button>

                            </div>

                        </div>
                    </section>
                </main>
                :
                <main className='container' style={{ height: "80vh" }}>
                    <section class="food_section">
                        <div class="container d-flex align-items-center justify-content-center" style={{ height: "80vh" }}>

                            <div className="">
                                <p className="h2 text-center d-block" style={{ fontWeight: "600" }}>Please log in to your account first</p>

                                <div className="d-flex justify-content-between mt-5">
                                    <Link to="/login" className='btn cart-btn' >Log In</Link>
                                    <Link to="/signup" className='btn cart-btn' >Sing Up</Link>
                                </div>
                            </div>

                        </div>
                    </section>
                </main>
            }


        </React.Fragment>

    );
}

export default Cart;