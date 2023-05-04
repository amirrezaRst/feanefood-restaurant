import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FoodContext from "../../services/FoodContext"
import SingleFoodCart from '../singlePages/SingleFoodCart';


const MenuFoodContent = () => {

    useEffect(() => {
        getAllFoodApi()
    }, [])

    const context = useContext(FoodContext)

    //! ALL STATE
    const [allFood, setAllFood] = useState([])
    const [allFoodBurger, setAllFoodBurger] = useState([])
    const [allFoodPizza, setAllFoodPizza] = useState([])
    const [allFoodPasta, setAllFoodPasta] = useState([])
    const [allFoodFries, setAllFoodFries] = useState([])

    const [foodFilter, setFoodFilter] = useState("all");



    const getAllFoodApi = async () => {
        await axios.get("http://localhost:3000/api/foods").then(res => {
            context.allFood = res.data
            setAllFood(res.data)
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        changeFoodFilter()
    }, [allFood])

    const changeFoodFilter = () => {
        setAllFoodBurger(allFood.filter(item => item.type == "burger"))
        setAllFoodPizza(allFood.filter(item => item.type == "pizza"))
        setAllFoodPasta(allFood.filter(item => item.type == "pasta"))
        setAllFoodFries(allFood.filter(item => item.type == "fries"))
    }

    const showFoodFilter = () => {
        console.log(`all burger : ${allFoodBurger}`);
        console.log(`all pizza : ${allFoodPizza}`);
    }
    // useEffect(() => {
    //     alert(`changed : ${foodFilter}`)
    // }, [foodFilter])

    return (


        <section class="food_section layout_padding">
            <div class="container">
                <div class="heading_container heading_center">
                    <h2>
                        Our Menu
                    </h2>
                </div>

                <ul class="filters_menu">
                    <li className={foodFilter == "all" ? "active" : ""} onClick={e => setFoodFilter("all")} >All</li>
                    <li className={foodFilter == "burger" ? "active" : ""} onClick={e => setFoodFilter("burger")} >Burger</li>
                    <li className={foodFilter == "pizza" ? "active" : ""} onClick={e => setFoodFilter("pizza")} >Pizza</li>
                    <li className={foodFilter == "pasta" ? "active" : ""} onClick={e => setFoodFilter("pasta")} >Pasta</li>
                    <li className={foodFilter == "fries" ? "active" : ""} onClick={e => setFoodFilter("fries")} >Fries</li>
                </ul>

                <div class="filters-content">
                    <div class="row grid">

                        {foodFilter == "all" ? allFood.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />) : null}
                        {foodFilter == "burger" ? allFoodBurger.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />) : null}
                        {foodFilter == "pizza" ? allFoodPizza.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />) : null}
                        {foodFilter == "pasta" ? allFoodPasta.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />) : null}
                        {foodFilter == "fries" ? allFoodFries.map(item => <SingleFoodCart foodName={item.name} foodMaterials={item.materials} foodPrice={item.price} foodPic={item.pic} foodId={item._id} />) : null}

                    </div>
                </div>
                {/* <div class="btn-box">
                    <a href="">
                        View More
                    </a>
                    <button className="btn btn-primary" onClick={showFoodFilter}>Show Result</button>
                </div> */}
            </div>
        </section>


    );
}

export default MenuFoodContent;