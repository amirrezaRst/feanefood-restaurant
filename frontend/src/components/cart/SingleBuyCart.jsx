import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { toast } from "react-toastify"
import FoodContext from '../../services/FoodContext';

const SingleBuyCart = ({ foodImage, foodName, foodCount, foodPrice, foodId, userId }) => {

    const imageUrl = `http://localhost:3000/${foodImage}`

    const [count, setCount] = useState(foodCount)
    const [price, setPrice] = useState(foodPrice)

    const [totalPrice, setTotalPrice] = useState(null);

    const context = useContext(FoodContext)

    const removeCart = async () => {
        await axios.delete(`http://localhost:3000/api/deleteCart/${userId}/${foodId}`).then(res => {
            toast.error("Food removed", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }


    const countPlus = () => {
        switch (count) {
            case 1:
                setCount(2)
                break;
            case 2:
                setCount(3)
                break;
            case 3:
                setCount(4)
                break;
            case 4:
                setCount(5)
                break;
            case 5:
                setCount(6)
                break;
            case 6:
                setCount(7)
                break;
            case 7:
                setCount(8)
                break;
            case 8:
                setCount(9)
                break;
            case 9:
                setCount(10)
                break;

            default:
                break;
        }
    }

    const countMinus = () => {
        switch (count) {
            case 1:
                // setFoodCount(2)
                break;
            case 2:
                setCount(1)
                break;
            case 3:
                setCount(2)
                break;
            case 4:
                setCount(3)
                break;
            case 5:
                setCount(4)
                break;
            case 6:
                setCount(5)
                break;
            case 7:
                setCount(6)
                break;
            case 8:
                setCount(7)
                break;
            case 9:
                setCount(8)
                break;
            case 10:
                setCount(9)
                break;

            default:
                break;
        }
    }


    useEffect(() => {
        updateSingleFoodCart()
    }, [count != undefined ? count : null])

    const updateSingleFoodCart = async () => {
        const body = {
            "count": count
        }
        await axios.put(`http://localhost:3000/api/updateCart/${userId}/${foodId}`, body).then(async res => {
            await setTotalPrice(res.data.reduce(function (a, b) { return a + b }, 0))
            // await console.log(`total food price : ${price * count}`);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        console.log("state changed");
        setTimeout(() => {
            changeState()
        }, 1000);
    }, [totalPrice])

    const changeState = () => {
        context.totalPrice = totalPrice;
        context.setTotalPrice(totalPrice);
    }

    return (
        <div class="col-sm-6 col-lg-4">
            <div class="box">
                <div>
                    <div class="img-box" style={{ position: "relative" }}>
                        <img src={imageUrl} alt="" />
                        <i className="fa fa-xmark text-danger mt-2 mr-2" style={{ position: "absolute", right: "0", top: "0", fontSize: "2rem" }} onClick={removeCart}></i>
                    </div>
                    <div class="detail-box">
                        <h5 className='text-capitalize'>
                            {foodName}
                        </h5>
                        <div className="options my-4 d-flex align-items-baseline">
                            <a onClick={countPlus}>
                                <i class="fa-solid fa-plus text-white"></i>
                            </a>
                            <p className="" style={{ fontSize: "1.7rem" }}>{count}</p>
                            <a onClick={countMinus}>
                                <i class="fa-solid fa-minus text-white"></i>
                            </a>
                        </div>
                        <div class="options">
                            <h6 style={{ fontSize: "1.3rem", color: "#ffc14f" }}>
                                <span className='text-white'>Total Price :</span> <span>${price * count}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBuyCart;