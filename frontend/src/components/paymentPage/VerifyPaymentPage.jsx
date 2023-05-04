import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import { Link, NavLink } from 'react-router-dom';
import AuthorizationContext from '../../services/AuthorizationContext';


const VerifyPaymentPage = () => {

    const [userPayment, setUserPayment] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(false)

    const context = useContext(AuthorizationContext);

    const queryParams = new URLSearchParams(window.location.search);
    const authority = queryParams.get("Authority");
    const status = queryParams.get("Status");

    const verifyPaymentApi = async () => {
        await axios.get(`http://localhost:3000/api/verifyPayment/${authority}/${status}`).then(async (res) => {
            setPaymentStatus(true);
            await axios.get(`http://localhost:3000/api/userPayment/${authority}`).then(res => {
                setUserPayment(res.data)
            })
        }).catch(err => {
            console.log(err);
            setPaymentStatus(false);
        });
    }

    useEffect(() => {
        if (status == "OK") {
            verifyPaymentApi()
        }
        else {
            console.log("The purchase was not made");
            setPaymentStatus(false);
        }
    }, [])


    const result = () => {
        console.log(userPayment);
    }


    return (
        <React.Fragment>

            <header class="header_section" style={{ background: "#14181b" }}>
                <div class="container">
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
                            <ul class="navbar-nav  mx-auto">
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


            <div className="w-100">
                <button className="btn btn-block btn-primary" onClick={result}>Result</button>
            </div>
            <main className='my-5 py-5 container'>

                <div className="card mx-auto" style={{ width: "55%" }}>
                    <div className="py-5 px-3">

                        {paymentStatus == true ?
                            <div>
                                <h5 className="text-center card-title text-dark" style={{ fontWeight: "600" }}>Thank you for your purchase</h5>

                                <div className="container px-4 mt-5">

                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Full Name</p>
                                        <p className='text-capitalize' style={{ fontSize: ".9rem" }}>{userPayment != null ? userPayment.user.fullName : null}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Order Count</p>
                                        <p className='text-capitalize' style={{ fontSize: ".9rem" }}>{userPayment != null ? userPayment.cart.length : null}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Amount Paid</p>
                                        <p className='text-capitalize' style={{ fontSize: ".9rem" }}>{userPayment != null ? userPayment.amount : null} $</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Payment Gateway</p>
                                        <p className='text-capitalize' style={{ fontSize: ".9rem" }}>Zarinpal</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "1rem", fontWeight: "600" }}>Tracking Code</p>
                                        <p className='text-capitalize' style={{ fontSize: ".9rem" }}>{userPayment != null ? userPayment.refId : null}</p>
                                    </div>

                                    <div className="w-50 mx-auto mt-3">
                                        <img src="./assets/images/delivery-png_prev_ui.png" className='img-fluid' alt="" />
                                    </div>

                                    <Link to="/" className="btn btn-block mt-5 py-2 text-white" style={{ background: "#ffbe33" }}>Go Home</Link>

                                </div>
                            </div> :
                            <div>
                                <h5 className="text-center card-title text-danger" style={{ fontWeight: "600" }}>Your purchase was unsuccessful</h5>
                                <div className='text-center'>
                                    <Link to="/cart" className="btn text-white mt-3" style={{ background: "#ffbe33", width: "35%" }}>Back To Cart</Link>
                                </div>
                            </div>
                        }

                    </div>
                </div>

            </main>

        </React.Fragment>
    );
}

export default VerifyPaymentPage;