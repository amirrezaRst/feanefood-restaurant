import React from 'react';


const SingleAdminContact = ({ fullName, phone, email, answering, id }) => {
    return (
        <tr>
            <td>{fullName}</td>
            <td> {phone} </td>
            <td>{email}</td>
            <td>
                <div class={answering == true ? "badge badge-outline-success" : "badge badge-outline-danger"}>{answering == true ? "true" : "false"}</div>
            </td>
            <td className='px-0 text-center'>
                <div class="dropleft w-100 h-100" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-ellipsis-vertical" style={{ fontSize: "1.25rem" }}></i>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item d-flex justify-content-between text-danger">
                            <span className='text-danger'>Delete</span>
                            <i className="fa fa-trash-can"></i>
                        </div>
                        <div className="dropdown-item d-flex justify-content-between text-success">
                            <span className='text-success'>Completed</span>
                            <i className='fa fa-check'></i>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default SingleAdminContact;