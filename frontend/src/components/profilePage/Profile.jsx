import React, { useContext, useEffect, useState } from 'react';

import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import {Helmet} from "react-helmet";

import AuthorizationContext from '../../services/AuthorizationContext';

const Profile = () => {

    const [userFullName, setUserFullName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userId, setUserId] = useState(null)

    const context = useContext(AuthorizationContext)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(context.FullName);
        console.log(context.email);
        getUserId()
        setUserFullName(context.FullName)
        setUserEmail(context.email)
    }, [context.email])

    const getUserId = async () => {

        await axios.get(`http://localhost:3000/api/usersEmail/${context.email}`).then(res => {
            console.log(`user api : ${res.data._id}`);
            setUserId(res.data._id)
            context.id = res.data._id
            context.setId(res.data._id)
        }).catch(err => {
            console.log(err);
        })
    }

    const showResult = () => {
        // console.log(userFullName);
        // console.log(userEmail);
        console.log(context.role);
    }

    const updateUserInfo = async () => {
        const body = {
            "fullName": userFullName,
            "email": userEmail
        }
        await axios.put(`http://localhost:3000/api/users/${userId}`, body).then(async (res) => {
            console.log(res);
            // alert("user updated")
            context.FullName = null
            context.email = null
            context.setFullName(null)
            context.setEmail(null)
            context.FullName = res.data.fullName
            context.email = res.data.email
            context.setFullName(res.data.fullName)
            context.setEmail(res.data.email)
            toast.success("User Updated", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const logout = () => {

        Swal.fire({
            // title: '<p class"">You want to log out!</p>',
            text: "You want to log out!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Log Out!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
                localStorage.removeItem("x-auth-token");
                toast.success("You have successfully logged out", {
                    position: "bottom-right",
                    theme: "dark",
                    closeOnClick: true
                })
                navigate("/")
            }
        })

    }


    return (

        <React.Fragment>

            <header class="header_section" style={{ background: "#14181b" }}>
                <div class="container">

                    <Helmet>
                        <title>Feane - Profile</title>
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
                                    <i class={context.role == "admin" ? "fa fa-user-shield" : "fa fa-user"} aria-hidden="true" style={{ color: "#ffbe33" }}></i>
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

            <main className="container my-5">

                <div className="card">
                    <div className="card-body profile-user-info">

                        <div className="d-flex justify-content-between mb-2">
                            <p className="h3 text-capitalize">{context.FullName}</p>
                            <div>
                                <i className="fa fa-door-open" style={{ fontSize: "1.5rem", cursor: "pointer", color: "#e2313d  " }} onClick={logout} ></i>
                                <Link to="/cart" class="fa-solid fa-cart-shopping ml-4" style={{ fontSize: "1.6rem", color: "black" }}></Link>
                                <i class="fa-solid fa-ellipsis-vertical ml-4" style={{ fontSize: "1.8rem" }} type="button" data-toggle="modal" data-target="#exampleModal"></i>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <p className="h5 my-4" style={{ color: "#62686d" }}>{context.email}</p>
                        </div>


                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form action="" onSubmit={e => e.preventDefault()}>

                                            <div className="mb-3">
                                                <label>Full Name</label>
                                                <input type="email" name="" id="" placeholder='Full Name' className='form-control' value={userFullName} onChange={e => setUserFullName(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label>Email</label>
                                                <input type="email" name="" id="" placeholder='Email' className='form-control' value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                                            </div>

                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={updateUserInfo}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* <button className="btn btn-primary" onClick={showResult}>Show</button> */}

                    </div>
                </div>

            </main>

        </React.Fragment>

    );
}

export default Profile;