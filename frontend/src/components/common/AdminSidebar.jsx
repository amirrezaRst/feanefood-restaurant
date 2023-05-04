import React, { useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import AuthorizationContext from '../../services/AuthorizationContext';


const AdminSidebar = () => {

    const context = useContext(AuthorizationContext);



    return (
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <a class="sidebar-brand brand-logo" href="index.html"><img src="assets/images/logo.svg" alt="logo" /></a>
                <a class="sidebar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
            </div>
            <ul class="nav">
                <li class="nav-item profile">
                    <div class="profile-desc" style={{ marginTop: "5vh" }}>
                        <div class="profile-pic">
                            <div class="profile-name">
                                <h6 class="mb-0 font-weight-normal text-white text-capitalize">{context.FullName}</h6>
                                <span>User Admin</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item nav-category">
                    <span class="nav-link">Navigation</span>
                </li>
                <li class="nav-item menu-items active">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-icon">
                            <i class="fa fa-dashboard"></i>
                        </span>
                        <span class="menu-title">Dashboard</span>
                    </a>
                </li>

            </ul>
        </nav>
    );
}

export default AdminSidebar;