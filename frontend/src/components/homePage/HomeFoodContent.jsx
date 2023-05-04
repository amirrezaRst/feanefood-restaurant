import React, { useContext, useEffect, useState } from 'react';
import axios from "axios"

import imagef6 from "../../images/f6.png";
import SingleFoodCart from '../singlePages/SingleFoodCart';
import { Link } from 'react-router-dom';


const HomeFoodContent = () => {

    useEffect(() => {
        getAllFoodHomeApi()
    }, [])

    // const context = useContext(FoodContext)


    //! ALL STATE
    const [allFoodHome, setAllFoodHome] = useState([])

    const getAllFoodHomeApi = async () => {
        await axios.get("http://localhost:3000/api/foodsForHome").then(res => {
            setAllFoodHome(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    // const show = () => {
    //     console.log(allFoodHome);
    //     // console.log(context.allFood);
    //     console.log(allFoodHome[0].materials);
    // }

    return (


        <section class="food_section layout_padding-bottom" >
            <div class="container">
                <div class="heading_container heading_center">
                    <h2>
                        Our Menu
                    </h2>
                </div>

                <div class="filters-content my-5">
                    <div class="row grid">

                        {allFoodHome.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />)}

                    </div>
                </div>
                <div class="btn-box">
                    {/* <button className="btn btn-primary" onClick={show}>Show</button> */}
                    <Link to="/menu">
                        View More
                    </Link>
                </div>
            </div>
        </section >


    );
}

export default HomeFoodContent;