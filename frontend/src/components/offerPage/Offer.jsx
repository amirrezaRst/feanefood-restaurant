import React from 'react';

import { NavLink, Link } from "react-router-dom";
import OfferHeader from './OfferHeader';


const Offer = () => {
    return (
        <React.Fragment>

            <OfferHeader />

            {/* <main className='py-5'>

                <h1 className='text-center mt-5'>Daily Offer</h1>


                <div className="container mt-5 pt-3">
                        <p className="h2 text-center">There is no discount for today</p>
                </div>

            </main> */}
            {/* <main className='container' style={{ height: "80vh" }}> */}
            {/* <section class="food_section"> */}

            <main className='pt-4' style={{ height: "50vh" }}>

                <h1 className='text-center my-5'>Daily Offer</h1>

                <div class="container d-flex align-items-center justify-content-center">

                    <div className="mt-2">
                        <p className="h2 text-center d-block" style={{ fontWeight: "600" }}>There is no discount for today</p>

                        <div className="d-flex justify-content-center mt-5">
                            <Link to="/" className='btn cart-btn' >Go Home <i className="fa fa-home"></i></Link>
                            {/* <Link to="/signup" className='btn cart-btn' >Sing Up</Link> */}
                        </div>
                    </div>

                </div>

                {/* <div className="container mt-5 pt-3">
                    <p className="h2 text-center">There is no discount for today</p>
                </div> */}

            </main>
            {/* </section> */}
            {/* </main> */}

        </React.Fragment>
    );
}

export default Offer;