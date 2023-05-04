import React, { useContext, useEffect, useState } from 'react';

import axios from "axios"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";

import AuthorizationContext from '../../services/AuthorizationContext';
import SingleFoodPageComment from './SignleFoodPageComment';


const SingleFoodPage = () => {

    const url = window.location.pathname.slice(12,)
    const navigate = useNavigate();

    useEffect(() => {
        getSingleFoodApi()
    }, [])

    //! ALL STATE
    const [foodData, setFoodData] = useState({});
    const [foodComments, setFoodComments] = useState([])
    const [foodMaterials, setFoodMaterials] = useState([])

    const [foodCount, setFoodCount] = useState(1)
    const [userId, setUserId] = useState(null)

    const context = useContext(AuthorizationContext)


    const getSingleFoodApi = async () => {
        await axios.get(`http://localhost:3000/api/foods/${url}`).then(res => {
            setFoodData(res.data)
            setFoodComments(res.data.comments)
            setFoodMaterials(res.data.materials)
            // console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    setTimeout(() => {
        getUserInfo()
    }, 1500);

    const imgUrl = `http://localhost:3000/${foodData.pic}`

    const getUserInfo = async () => {
        if (context.email != null) {
            await axios.get(`http://localhost:3000/api/usersEmail/${context.email}`).then(res => {
                setUserId(res.data._id)
                // console.log(res);
            }).catch(err => {
                // console.log(err);
            })
        }
    }



    const percent = (num, per) => {
        // return Math.round(((num / 100) * per) * 10) / 10
        return (num / 100) * per
    }

    var percentPrice = 0
    if (foodData.discount != 0) {
        percentPrice = percent(foodData.price, foodData.discount) * foodCount;
    }

    const setNewCartFood = async () => {
        if (!localStorage.getItem("x-auth-token")) {
            Swal.fire({
                text: "Please log in to your account first!",
                icon: 'error',
                confirmButtonColor: '#919294',
                confirmButtonText: 'Ok!'
            })
            return navigate("/login");
        }

        // console.log((foodData.price * foodCount) - (Math.round(percentPrice * 10) / 10));

        const input = foodData.discount != 0 ? foodData.price - (Math.round(percentPrice * 10) / 10) : foodData.price;

        // console.log("_____________");
        // console.log(foodCount);
        // console.log(foodData.name);
        // console.log(foodData.price);
        // console.log("_____________");


        const body = {
            "name": foodData.name,
            "count": foodCount,
            "price": input,
            "pic": foodData.pic
        }
        console.log(body);
        await axios.post(`http://localhost:3000/api/addCart/${userId}`, body).then(res => {
            console.log(res);
            toast.success("Food has been added to the cart", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        }).catch(err => {
            console.log(err);
        })
    }


    const showResult = () => {
        console.log(`foodCount ${foodCount}`);
        console.log(`foodPrice ${foodData.price}`);
        console.log(`foodName ${foodData.name}`);
    }


    const countPlus = () => {
        switch (foodCount) {
            case 1:
                setFoodCount(2)
                break;
            case 2:
                setFoodCount(3)
                break;
            case 3:
                setFoodCount(4)
                break;
            case 4:
                setFoodCount(5)
                break;
            case 5:
                setFoodCount(6)
                break;
            case 6:
                setFoodCount(7)
                break;
            case 7:
                setFoodCount(8)
                break;
            case 8:
                setFoodCount(9)
                break;
            case 9:
                setFoodCount(10)
                break;

            default:
                break;
        }
    }

    const countMinus = () => {
        switch (foodCount) {
            case 1:
                // setFoodCount(2)
                break;
            case 2:
                setFoodCount(1)
                break;
            case 3:
                setFoodCount(2)
                break;
            case 4:
                setFoodCount(3)
                break;
            case 5:
                setFoodCount(4)
                break;
            case 6:
                setFoodCount(5)
                break;
            case 7:
                setFoodCount(6)
                break;
            case 8:
                setFoodCount(7)
                break;
            case 9:
                setFoodCount(8)
                break;
            case 10:
                setFoodCount(9)
                break;

            default:
                break;
        }
    }

    return (

        <React.Fragment>

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
                                    <NavLink class="nav-link navbar-text" to="/about" ><span className="mx-3" style={{ color: "#fffaf2" }}>About</span></NavLink>
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
                </div>
            </header>


            <Helmet>
                <title>Feane - Order Food</title>
            </Helmet>

            <main className="container h-100" style={{ margin: "10vh auto" }}>
                <div className="row">

                    <div className="col-lg-4 col-md-10 d-flex">

                        <div className="mx-auto">

                            <img src={imgUrl} className="img-fluid" alt="" />
                        </div>

                    </div>


                    <div className="col-lg-8 col-md-12 bg-light d-flex flex-column justify-content-around" style={{ position: "relative" }}>
                        {foodData.discount != 0 ?
                            <div className="discount-label">
                                <div className='text-center p-1' style={{ fontSize: "1.4rem", fontWeight: "bold", color: "white" }}><i className="fa-solid fa-percent mx-1" style={{ fontSize: "1.4rem" }}></i>{foodData.discount}</div>
                            </div> : null
                        }
                        <div className="mt-4 py-0">

                            <div className="container">
                                <div className="d-flex justify-content-between">
                                    <p className='h2 text-capitalize mb-4' style={{ fontWeight: "600" }}>{foodData.name}</p>
                                </div>

                                <p className='h5 mt-3'><span className='h4'>Materials : </span> {foodMaterials.map(item => item)}  </p>
                                <p className='h5 mt-3'><span className='h4'>Score :  </span><span className='m-1'>{foodData.score}</span><i className="fa fa-star" style={{ color: "#ffbe33" }}></i></p>
                                <p className='h5 mt-3 mb-4'>
                                    <span className='h4'>Price :  </span>

                                    <div className="d-inline" style={foodData.discount != 0 ? { color: "#ed3645", textDecoration: "line-through" } : {}}>
                                        <span className=''>{foodData.price * foodCount}</span>
                                        <i class="fa-solid fa-dollar-sign ml-2" style={{ fontSize: "1.3" }}></i>
                                    </div>

                                    {foodData.discount != 0 ?
                                        <div className='d-inline'>
                                            <span className='ml-4'>{(foodData.price * foodCount) - (Math.round(percentPrice * 10) / 10)}</span>
                                            <i class="fa-solid fa-dollar-sign ml-2" style={{ color: "#ffbe33", fontSize: "1.3" }}></i>
                                        </div> : null
                                    }
                                </p>
                            </div>

                            <div className="d-flex justify-content-between mr-4 mb-3 mt-lg-0 mt-4 container">
                                <button className="btn text-white" style={{ background: "#ffbe33" }} onClick={setNewCartFood} >Add to Cart</button>

                                <div className="d-flex">
                                    <button className="btn btn-secondary" onClick={countPlus}>+</button>
                                    <h4 className='mx-3' style={{ fontWeight: "600" }}>{foodCount}</h4>
                                    <button className="btn btn-secondary" onClick={countMinus}>-</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>


            <main className='container' style={{ marginTop: "10vh" }}>

                <p className='h2' onClick={showResult}>User Comments</p>

                <section className='my-5 container-fluid'>

                    {/* <SingleFoodPageComment /> */}
                    {foodComments.length != 0 ? foodComments.map(item => <SingleFoodPageComment userName={item.name} userScore={item.score} userText={item.text} userTime={item.time} userId={item._id} />) : <h5 className='alert alert-secondary text-white p-4' style={{ background: "#222831" }}>There is no comment</h5>}

                </section>

            </main>


        </React.Fragment>

    );
}

export default SingleFoodPage;