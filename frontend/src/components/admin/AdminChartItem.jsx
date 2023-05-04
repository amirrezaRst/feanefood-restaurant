import React from 'react';



const AdminChartItem = ({ price, percent, title }) => {
    return (
        <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div class="card">
                <div class="card-body admin-header-item">
                    <div class="row">
                        <div class="col-9">
                            <div class="d-flex align-items-center align-self-start">
                                {/* <h3 class="mb-0 admin-card-header">$12.34</h3> */}
                                <h3 class="mb-0 admin-card-header">${price}</h3>
                                {/* <p class="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                                <p class="text-success ml-2 mb-0 font-weight-medium">{percent}%</p>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="icon icon-box-success ">
                                <i class="fa fa-arrow-up-right"></i>
                            </div>
                        </div>
                    </div>
                    {/* <h6 class="text-muted font-weight-normal">Potential growth</h6> */}
                    <h6 class="text-muted font-weight-normal">{title}</h6>
                </div>
            </div>
        </div>

    );
}

export default AdminChartItem;