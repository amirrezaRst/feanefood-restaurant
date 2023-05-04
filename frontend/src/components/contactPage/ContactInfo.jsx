import React from 'react';


const ContactInfo = () => {
    return (
        <div class="col-md-6">

            <div className="container">

                <h4 className='mb-3' style={{ fontWeight: "600" }}>About Us</h4>
                <div className="container">
                    <p>
                        <i class="fa fa-phone mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Call :</span> +01 1234567890
                        </span>
                    </p>
                    <p>
                        <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Email :</span> feaneFood@gmail.com
                        </span>
                    </p>
                    <p>
                        <i class="fa-brands fa-instagram font-weight-bold mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Instagram :</span> @feane_food
                        </span>
                    </p>
                    <p>
                        <i class="fa fa-map-marker mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Address :</span>
                        </span>
                    </p>
                </div>

                <h4 className='mt-4' style={{ fontWeight: "600" }}>About Me</h4>
                <div className="container">
                    <p>
                        <i class="fa fa-phone mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Call :</span> +98 9903738378
                        </span>
                    </p>
                    <p>
                        <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Email :</span> amirreza.rostami.0073@gmail.com
                        </span>
                    </p>
                    <p>
                        <i class="fa-brands fa-instagram font-weight-bold mr-2" aria-hidden="true"></i>
                        <span>
                            <span style={{ fontWeight: "700" }}>Instagram :</span> @_amir_r.s.t_
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ContactInfo;