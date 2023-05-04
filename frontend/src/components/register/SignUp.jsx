import React, { useContext, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify";
import {Helmet} from "react-helmet";

import UserContext from '../../services/UserContext';
import burger1 from "../../images/burger-image-1.png";

const SignIn = ({ history }) => {

    const [enterFullName, setEnterFullName] = useState(null)
    const [enterEmail, setEnterEmail] = useState(null)
    const [enterPassword, setEnterPassword] = useState(null)

    const navigate = useNavigate();
    const context = useContext(UserContext)

    const fullNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const signUpUserApi = async () => {

        if (enterFullName == null || enterFullName == "") return fullNameRef.current.focus();
        else if (enterEmail == null || enterEmail == "") return emailRef.current.focus();
        else if (enterPassword == null || enterPassword == "") return passwordRef.current.focus();


        const body = {
            "fullName": enterFullName,
            "email": enterEmail,
            "password": enterPassword
        }
        await axios.post("http://localhost:3000/api/register", body).then(res => {
            toast.success("Registration is done", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            context.userFullName = enterFullName;
            context.userEmail = enterEmail;
            context.userPassword = enterPassword;

            navigate("/login")
        }).catch(err => {
            toast.error("something went wrong", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            console.log(err);
            console.log(`context : ${context.userEmail}`);
            console.log(`context : ${context.userPassword}`);

        })
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

            <Helmet>
                <title>Feane - Signup</title>
            </Helmet>

            <section class="book_section py-4">
                <div class="container">
                    <div class="heading_container">
                        <h3 className="h1 mb-0 mt-5">
                            Sign Up
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mt-5">
                            <div class="form_container">
                                <form action="" className='was-validated' onClick={e => e.preventDefault()}>
                                    <div>
                                        <input type="text" ref={fullNameRef} class="form-control mb-3" placeholder="Full Name" onChange={e => setEnterFullName(e.target.value)} required />
                                        <label htmlFor="" className="invalid-feedback mb-4">Please Enter Full Name</label>
                                    </div>
                                    <div>
                                        <input type="email" ref={emailRef} class="form-control" placeholder="Email" onChange={e => setEnterEmail(e.target.value)} required />
                                        <label htmlFor="" className="invalid-feedback mb-4">Please Enter Email</label>
                                    </div>
                                    <div>
                                        <input type="text" ref={passwordRef} class="form-control" placeholder="Password" onChange={e => setEnterPassword(e.target.value)} required />
                                        <label htmlFor="" className="invalid-feedback mb-4">Please Enter Password</label>
                                    </div>

                                    <div className="">
                                        <Link to="/login">I have a acount</Link>
                                    </div>
                                    <div class="btn_box">
                                        <button onClick={signUpUserApi} >
                                            Sign Up
                                            {/* <Link to={changeLocation} className="text-white">sign up</Link> */}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <img src={burger1} alt="" />
                        </div>
                    </div>
                </div>
            </section>


        </React.Fragment>
    );
}

export default SignIn;