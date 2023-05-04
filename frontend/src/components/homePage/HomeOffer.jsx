import React from 'react';

import { Link } from "react-router-dom";

import image1 from "../../images/o1.jpg";
import image2 from "../../images/o2.jpg";


const HomeOffer = () => {
    return (

        <React.Fragment>

            {/* <!-- offer section --> */}
            <h1 className='heading_container heading_center' style={{ marginTop: "10vh" }}>Daily Offer</h1>

            <section class="offer_section layout_padding-bottom" style={{ paddingTop: "0" }}>
                <div class="offer_container">
                    <div class="container ">
                        <div class="row">
                            <div class="col-md-6  ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src={image1} alt="" />
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            Tasty Thursdays
                                        </h5>
                                        <h6>
                                            <span>20%</span> Off
                                        </h6>
                                        <Link to="/offer">
                                            Order Now
                                            <i class="fa-solid fa-cart-shopping text-white"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6  ">
                                <div class="box ">
                                    <div class="img-box">
                                        <img src={image2} alt="" />
                                    </div>
                                    <div class="detail-box">
                                        <h5>
                                            Tasty Thursdays
                                        </h5>
                                        <h6>
                                            <span>20%</span> Off
                                        </h6>
                                        <Link to="/offer">
                                            Order Now
                                            <i class="fa-solid fa-cart-shopping text-white"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- end offer section --> */}

        </React.Fragment>

    );
}

export default HomeOffer;