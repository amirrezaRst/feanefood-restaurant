import React, { useState } from 'react';

import HomeHeader from './HomeHeader';
import HomeOffer from './HomeOffer';
import HomeFoodContent from './HomeFoodContent';
import HomeAbout from './HomeAbout';
import HomeContact from './HomeContact';
import UserContext from '../../services/UserContext';
import FoodContext from '../../services/FoodContext';

const Home = () => {

    //! REGISTER CONTEXT STATE
    const [userFullName, setUserFullName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userPassword, setUserPassword] = useState(null);


    //! FOOD CONTEXT STATE
    const [allFood, setAllFood] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    return (

        <UserContext.Provider value={{ userFullName: userFullName, setUserFullName: setUserFullName, userEmail: userEmail, setUserEmail: setUserEmail, userPassword: userPassword, setUserPassword: setUserPassword }}>

            <FoodContext.Provider value={{ allFood: allFood, setAllFood: setAllFood, totalPrice: totalPrice, setTotalPrice: setTotalPrice }}>

                <HomeHeader />
                <HomeOffer />
                <HomeFoodContent />
                <HomeAbout />
                <HomeContact />

            </FoodContext.Provider>

        </UserContext.Provider>

    );
}

export default Home;