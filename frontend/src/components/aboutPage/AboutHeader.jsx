import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AuthorizationContext from '../../services/AuthorizationContext';


const AboutHeader = () => {
    const context = useContext(AuthorizationContext)

    return (
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
                                <NavLink class="nav-link navbar-text" to="/about" ><span className="mx-3" style={{ color: "#ffbe33" }}>About</span></NavLink>
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
            </div >
        </header >
    );
}

export default AboutHeader;