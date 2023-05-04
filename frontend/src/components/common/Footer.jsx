import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (

        <React.Fragment>


            {/* <!-- footer section --> */}
            <footer class="footer_section">
                {/* <div class="container"> */}
                <div class="row">
                    <div class="col-md-4 footer-col">
                        <div class="footer_contact">
                            <h4>
                                Contact Us
                            </h4>
                            <div class="contact_link_box">
                                <a>
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                                    <span>
                                        Location
                                    </span>
                                </a>
                                <a>
                                    <i class="fa fa-phone" aria-hidden="true"></i>
                                    <span>
                                        Call +01 1234567890
                                    </span>
                                </a>
                                <a>
                                    <i class="fa fa-envelope" aria-hidden="true"></i>
                                    <span>
                                        demo@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 footer-col">
                        <div class="footer_detail">
                            <Link to="/" class="footer-logo">
                                Feane
                            </Link>
                            <p>
                                Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin
                                words, combined with
                            </p>
                            <div class="footer_social">
                                <a>
                                    <i class="fab fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a>
                                    <i class="fab fa-twitter" aria-hidden="true"></i>
                                </a>
                                <a>
                                    <i class="fab fa-linkedin" aria-hidden="true"></i>
                                </a>
                                <a>
                                    <i class="fab fa-instagram" aria-hidden="true"></i>
                                </a>
                                <a>
                                    <i class="fab fa-pinterest" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 footer-col">
                        <h4>
                            Opening Hours
                        </h4>
                        <p>
                            Everyday
                        </p>
                        <p>
                            10.00 Am -10.00 Pm
                        </p>
                    </div>
                </div>
                <div class="footer-info">
                    <p>
                        {/* &copy; <span id="displayYear"></span> All Rights Reserved By
                        <a href="https://html.design/">Free Html Templates</a><br /><br /> */}
                        <div className='mb-2'>&copy; <span id='displayYear'>All rights of this site belong to Finfood</span></div>
                        <div>&copy; Distributed By amirreza rst</div>
                    </p>
                </div>
                {/* <p>
                            &copy; <span id="displayYear"></span> All Rights Reserved By 
                            <a href="http://html.design/">Free Html Templates</a><br /><br />
                        </p> */}
                {/* </div> */}
            </footer>
            {/* <!-- footer section --> */}


        </React.Fragment>

    );
}

export default Footer;