import React from 'react';
import { useLocation } from 'react-router';
import Footer from '../common/Footer';


const MainLayout = ({ children }) => {
    return (

        <React.Fragment>


            {children}
            <Footer />

        </React.Fragment>

    );
}

export default MainLayout;