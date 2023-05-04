import React, { useContext, useEffect, useReducer, useRef,useState } from 'react';

import axios from "axios"
import { toast } from 'react-toastify';

import ContactInfo from "./ContactInfo";


const ContactSection = () => {

    const [fullNameField, setFullNameField] = useState(null);
    const [phoneField, setPhoneField] = useState(null);
    const [emailField, setEmailField] = useState(null);

    const fullNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();

    const getContactApi = async () => {
        if (fullNameField == "" || fullNameField == null) return fullNameRef.current.focus();
        else if (phoneField == "" || phoneField == null) return phoneRef.current.focus();
        else if (emailField == "" || emailField == null) return emailRef.current.focus();

        const body = {
            fullName: fullNameField,
            phone: phoneField,
            email: emailField
        }

        await axios.post("http://localhost:3000/api/addContact", body).then(res => {
            toast.success(`The form has been submitted successfully`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        }).catch(err => {
            toast.error(`Something Went Wrong!`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            console.log(err);
        })
    }

    return (
        <section class="book_section layout_padding">
            <div class="container">
                <div class="heading_container">
                    <h2>
                        Contact Us
                    </h2>
                </div>
                <div class="row">

                    <div class="col-md-6">
                        <div class="form_container">
                            <form action="" className='was-validated' onSubmit={e => e.preventDefault()}>
                                <div>
                                    <input type="text" class="form-control" ref={fullNameRef} placeholder="Your Full Name" value={fullNameField} onChange={e => setFullNameField(e.target.value)} required />
                                </div>
                                <div>
                                    <input type="text" class="form-control" ref={phoneRef} placeholder="Phone Number" value={phoneField} onChange={e => setPhoneField(e.target.value)} required />
                                </div>
                                <div>
                                    <input type="email" class="form-control" ref={emailRef} placeholder="Your Email" value={emailField} onChange={e => setEmailField(e.target.value)} required />
                                </div>
                                <div class="btn_box">
                                    <button onClick={getContactApi}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ContactInfo />

                </div>
            </div>
        </section>
    );
}

export default ContactSection;