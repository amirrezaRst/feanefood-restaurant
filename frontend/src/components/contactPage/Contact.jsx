import React from 'react';

import {Helmet} from "react-helmet";

import ContactHeader from './ContactHeader';
import ContactSection from './ContactSection';


const Contact = () => {
    return (
        <React.Fragment>

            <Helmet>
                <title>Feane - Contact Us</title>
            </Helmet>

            <ContactHeader />
            <ContactSection />

        </React.Fragment>
    );
}

export default Contact;