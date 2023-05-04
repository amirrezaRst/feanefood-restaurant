import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';


const SingleFoodCart = ({ foodName, foodMaterials, foodPrice, foodPic, foodId }) => {
    const pictureUrl = `http://localhost:3000/${foodPic}`

    const locationUrl = `/singlePage/${foodId}`



    return (
        <Link to={locationUrl} class="col-sm-6 col-lg-4">
            <div class="box">
                <div>
                    <div class="img-box">
                        <img src={pictureUrl} alt="" />
                    </div>
                    <div class="detail-box">
                        <h5 className='text-capitalize'>
                            {foodName}
                        </h5>
                        <p className='mt-4' style={{ color: "#9b9b9b" }}>
                            <span className='text-white'>Materials :</span> {foodMaterials}
                        </p>
                        <div class="options">
                            <h6 style={{ fontSize: "1.3rem", color: "#ffc14f" }}>
                                {/* $15 */}
                                ${foodPrice}
                            </h6>
                            <a href="">
                                <i class="fa-solid fa-cart-shopping text-white"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SingleFoodCart;