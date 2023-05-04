import React from 'react';
import {Helmet} from "react-helmet";

import AboutHeader from './AboutHeader';
import AboutSection from './AboutSection';


const About = () => {
    return (
        <React.Fragment>

            <Helmet>
                <title>Feane - About Us</title>
            </Helmet>

            <AboutHeader />
            <AboutSection />

        </React.Fragment>
    );
}

export default About;