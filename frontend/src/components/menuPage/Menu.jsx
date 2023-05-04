import React from 'react';

import {Helmet} from "react-helmet";

import MenuFoodContent from './MenuFoodContent';
import MenuHeader from './MenuHeader';


const Menu = () => {
    return (
        <React.Fragment>

            <Helmet>
                <title>Feane - Menu</title>
            </Helmet>

            <MenuHeader />
            <MenuFoodContent />

        </React.Fragment>
    );
}

export default Menu;