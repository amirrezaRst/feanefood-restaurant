import React from 'react';
import { Link } from 'react-router-dom';

import about from "../../images/about-img.png"


const HomeAbout = () => {
    return (

        <section class="about_section layout_padding">
            <div class="container  ">

                <div class="row">
                    <div class="col-md-6 ">
                        <div class="img-box">
                            <img src={about} alt="" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="detail-box">
                            <div class="heading_container">
                                <h2>
                                    We Are Feane
                                </h2>
                            </div>
                            <p>
                                We are feaneFood and we serve our dear customers with many branches all over the country.
                                feaneFood started on October 18, when we decided to build a food ordering site so that
                                our dear customers can customize their food for the first time in the country and order
                                according to their taste and get it delivered quickly.
                            </p>
                            <Link to="/about">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default HomeAbout;