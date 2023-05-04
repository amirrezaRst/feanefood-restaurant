import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../services/UserContext';

import burger1 from "../../images/burger-image-1.png";
import { toast } from 'react-toastify';
import AuthorizationContext from '../../services/AuthorizationContext';


const LogIn = () => {

    const [enterEmail, setEnterEmail] = useState(null)
    const [enterPassword, setEnterPassword] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        setEnterEmail(context.userEmail)
        setEnterPassword(context.userPassword)
    }, [])

    const context = useContext(UserContext)
    const userContext = useContext(AuthorizationContext)


    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const getUserAuthorization = async () => {

        await axios.get("http://localhost:3000/auth", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            userContext.FullName = res.data.fullName
            userContext.role = res.data.role
            userContext.email = res.data.email
            userContext.setFullName = res.data.fullName
            userContext.setRole = res.data.role
            userContext.setEmail = res.data.email
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


    const loginInUserApi = async () => {
        if (enterEmail == null || enterEmail == "") return emailRef.current.focus();
        else if (enterPassword == null || enterPassword == "") return passwordRef.current.focus();

        const body = {
            "email": enterEmail,
            "password": enterPassword
        }

        await axios.post("http://localhost:3000/api/login", body).then(res => {

            toast.success(`Welcome ${res.data.slice(8,)}`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            console.log(res);
            localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
            context.userFullName = res.data.slice(8,);

            getUserAuthorization();
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }).catch(err => {
            toast.error(`${err.response.data}`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            console.log(err);
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
                                <Link to={userContext.role == "admin" ? "/dashboard" : localStorage.getItem("x-auth-token") == null ? "/login" : "/profile"}>
                                    <i class={userContext.role == "admin" ? "fa fa-user-shield" : "fa fa-user"} aria-hidden="true" style={{ color: "#fffaf2" }}></i>
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



            <section class="book_section py-4">
                <div class="container">
                    <div class="">
                        <h3 className="h1 mb-0" style={{ marginTop: "3rem" }}>
                            Log In
                        </h3>
                    </div>
                    <div class="row">
                        <div class="col-md-6" style={{ paddingTop: "10vh" }}>
                            <div class="form_container">
                                <form action="" className='was-validated' onClick={e => e.preventDefault()}>
                                    <div>
                                        <input type="text" ref={emailRef} class="form-control" placeholder="Your Email" value={enterEmail} onChange={e => setEnterEmail(e.target.value)} required />
                                        <label htmlFor="" className="invalid-feedback mb-4">Please Enter Email</label>
                                    </div>
                                    <div>
                                        <input type="password" ref={passwordRef} class="form-control" placeholder="Your Password" value={enterPassword} onChange={e => setEnterPassword(e.target.value)} required />
                                        <label htmlFor="" className="invalid-feedback mb-4">Please Enter Password</label>
                                    </div>
                                    {/* <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="defaultCheck1" />
                                        <label class="form-check-label" for="defaultCheck1">
                                            Default checkbox
                                        </label>
                                    </div> */}
                                    {/* <input type="checkbox" name="d" id="" /> */}

                                    <div className="">
                                        <Link to="/signup">I don't have an account</Link>
                                    </div>
                                    <div class="btn_box">
                                        <button onClick={loginInUserApi}>
                                            Log In
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

export default LogIn;