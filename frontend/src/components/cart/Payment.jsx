import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

import AuthorizationContext from '../../services/AuthorizationContext';
import SinglePaymentFood from './SinglePaymentFood';


const Payment = () => {

    const [userAddress, setUserAddress] = useState(null)

    const addressRef = useRef();

    const params = useLocation();
    const context = useContext(AuthorizationContext);

    const verifyCartApi = async (req, res) => {
        if (userAddress == null) return addressRef.current.focus();

        await axios.get(`http://localhost:3000/api/checkoutCart/${userAddress}`, { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            window.location = res.data.url
        }).catch(err => {
            console.log(err);
        })
    }




    const result = () => {
        console.log(userAddress);
    }



    return (
        <React.Fragment>

            <header class="header_section" style={{ background: "#14181b" }}>
                <div class="container">

                    <Helmet>
                        <title>Feane - Payment</title>
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
                                    <i class="fa-solid fa-cart-shopping" style={{ color: "#fffaf2" }}></i>
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


            <main className='container my-5'>

                <h3 className='h2' style={{ fontWeight: "600" }} onClick={result}>Payment</h3>

                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="py-3 px-3">

                                <h5 style={{ fontWeight: "600" }}>Your order</h5>


                                <div className='mt-4'>

                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Total Price :</p>
                                        <span style={{ fontWeight: "600", fontSize: "1.1rem", color: "#999999" }}>{params.state.totalPrice} $</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>shipping cost :</p>
                                        <span style={{ fontWeight: "600", fontSize: "1.1rem", color: "#999999" }}>Free</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Tax :</p>
                                        <span style={{ fontWeight: "600", fontSize: "1.1rem", color: "#999999" }}>Free</span>
                                    </div>

                                    <div class="dropdown-divider"></div>

                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Payable fee :</p>
                                        <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "gray" }}>{params.state.totalPrice} $</span>
                                    </div>


                                </div>
                                <button className="btn btn-block mt-4" style={{ background: "#ffba30", color: "white" }} onClick={verifyCartApi}>Payment</button>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="py-3 px-3">

                                <div class="d-flex justify-content-between align-items-center flex-row mt-2">
                                    <h5 class="card-title text-dark">Your Cart</h5>
                                    <Link to="/cart" className='btn' style={{ background: "#ffba30", color: "white" }}>Edit Order</Link>
                                </div>

                                <div class="preview-list mt-4">

                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th className="text-dark" style={{ fontSize: "1rem" }}>  </th>
                                                    <th className="text-dark" style={{ fontSize: "1rem" }}> Name </th>
                                                    <th className="text-dark" style={{ fontSize: "1rem" }}> Count </th>
                                                    <th className="text-dark" style={{ fontSize: "1rem" }}> Price </th>
                                                </tr>
                                            </thead>
                                            <tbody className='user-info-list'>

                                                {params.state.userCart != undefined ? params.state.userCart.map(item => <SinglePaymentFood name={item.name} count={item.count} price={item.price} pic={item.pic} />) : null}

                                            </tbody>
                                        </table>
                                    </div>

                                    <form className='mt-4 was-validated' onSubmit={e => e.preventDefault()}>
                                        <label htmlFor="userAddress">Address</label>
                                        <input type="text" ref={addressRef} id="userAddress" className='form-control' name="" placeholder='Address' value={userAddress} onChange={e => setUserAddress(e.target.value)} required />
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </React.Fragment >
    );
}

export default Payment;