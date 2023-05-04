import React, { useState, useEffect, useRef } from 'react';

import axios from "axios";
import { toast } from 'react-toastify';

import AdminContext from "../../services/AdminContext";
import AdminLayout from '../layouts/AdminLayout';
import AdminChartItem from './AdminChartItem';
import AdminProjects from './AdminProjects';
import AdminOrder from "./AdminOrder";
import SingleAdminUser from './SingleAdminUser';
import SingleAdminContact from './SingleAdminContact';
import SingleAdminTodo from './SingleAdminTodo';
import { useContext } from 'react';
import AuthorizationContext from '../../services/AuthorizationContext';
import AdminSpecification from './AdminSpecification';


const Admin = () => {


    const [userId, setUserId] = useState(null);

    //! Api States
    const [foods, setFoods] = useState([]);
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [sales, setSales] = useState(0);

    //! NewUser States
    const [fullNameInput, setFullNameInput] = useState(null);
    const [emailInput, setEmailInput] = useState(null);
    const [passwordInput, setPasswordInput] = useState(null);
    const [roleInput, setRoleInput] = useState(null);

    //! Change Password State
    const [changePassword, setChangePassword] = useState(null);
    const [changeConfirmPassword, setChangeConfirmPassword] = useState(null);


    //! NewUser Ref
    const fullNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();


    //! Change Password Ref
    const changePasswordRef = useRef();
    const changeConfirmPasswordRef = useState();


    const context = useContext(AuthorizationContext)


    const getUserApi = async () => {
        await axios.get("http://localhost:3000/api/admin/Users", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const getFoodApi = async () => {
        await axios.get("http://localhost:3000/api/admin/foods", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            setFoods(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getContactApi = async () => {
        await axios.get("http://localhost:3000/api/admin/contacts", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            setContacts(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getSalesApi = async () => {
        await axios.get("http://localhost:3000/api/totalPayment", { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(async res => {
            console.log(res);
            const sum = await res.data.reduce((accumulator, object) => {
                return accumulator + object.amount;
            }, 0);
            setSales(sum)

        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {
        getUserApi();
        getFoodApi();
        getContactApi();
        getSalesApi();
    }, [])



    const newUserApi = async () => {
        if (fullNameInput == null || fullNameInput == "") return fullNameRef.current.focus();
        else if (emailInput == null || emailInput == "") return emailRef.current.focus();
        else if (passwordInput == null || passwordInput == "") return passwordRef.current.focus();
        else if (roleInput == null || roleInput == "") return roleRef.current.focus();


        const body = {
            fullName: fullNameInput,
            email: emailInput,
            password: passwordInput,
            role: roleInput
        }

        await axios.post("http://localhost:3000/api/admin/addUser", body, { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            console.log(res);
            toast.success(`User Created`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            getUserApi();
        }).catch(err => {
            console.log(err);
            toast.error(`Something Went Wrong!`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        });
    }

    const getSingleUser = async () => {
        setTimeout(async () => {
            if (context.email) {
                await axios.get(`http://localhost:3000/api/usersEmail/${context.email}`).then(res => {
                    console.log(res);
                    setUserId(res.data._id)
                }).catch(err => {
                    console.log(err);
                })
            }
        }, 1000);
    }

    useEffect(() => {
        getSingleUser()
    }, [context.email])

    const changePasswordApi = async () => {
        if (changePassword == null || changePassword == "") return changePasswordRef.current.focus();
        else if (changeConfirmPassword == null || changeConfirmPassword == "") return changeConfirmPasswordRef.current.focus();
        else if (changePassword != changeConfirmPassword) {
            toast.error("Confirm password is different!", {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
            return changeConfirmPasswordRef.current.focus()
        };

        const body = {
            password: changePassword
        }

        await axios.post(`http://localhost:3000/api/admin/changePassword/${userId}`, body, { headers: { "x-auth-token": localStorage.getItem("x-auth-token") } }).then(res => {
            console.log(res);
            toast.success(`Password Changed`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        }).catch(err => {
            console.log(err);
            toast.error(`Something Went Wrong!`, {
                position: "bottom-right",
                closeOnClick: true,
                theme: "dark"
            })
        })
    }


    // const result = () => {
    //     console.log(sales);
    // }



    return (

        <AdminContext.Provider value={{ allFood: foods, setAllFood: setFoods, users, setUsers, allContact: contacts, setAllContact: setContacts, sales, setSales }} >

            <AdminLayout>

                <div class="main-panel">
                    {/* <button className='btn btn-ls btn-primary' onClick={result}>Result</button> */}
                    <div class="content-wrapper">

                        <div style={{ cursor: "pointer" }}>
                            <h6 className='text-danger mb-4' data-toggle="modal" data-target="#exampleModal2">Change Password <i className="fa fa-key"></i></h6>
                        </div>

                        <div class="modal fade" id="exampleModal2" tabindex="10" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel2">Change Password</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body py-0">

                                        <div class="grid-margin stretch-card mb-0">
                                            <div class="card border-0">
                                                <div class="card-body bg-white">

                                                    <form class="forms-sample was-validated" onSubmit={e => e.preventDefault()}>

                                                        <div class="form-group mb-4">
                                                            <label for="inputPassword">Password</label>
                                                            <input type="password" ref={changePasswordRef} class="form-control" id="inputPassword" placeholder="Password" value={changePassword} onChange={e => setChangePassword(e.target.value)} required />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="inputPassword">Confirm Password</label>
                                                            <input type="password" ref={changeConfirmPasswordRef} class="form-control" id="inputPassword" placeholder="Confirm Password" value={changeConfirmPassword} onChange={e => setChangeConfirmPassword(e.target.value)} required />
                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" onClick={changePasswordApi}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            {/* <AdminChartItem price={12.34} percent={+3.5} title={"Potential growth"} /> */}
                        </div>

                        {/* <AdminProjects /> */}

                        <AdminSpecification food={foods.length} sales={sales} user={users.length} />


                        {/* <AdminOrder /> */}



                        {/* ____Start User List____ */}
                        <div class="row ">
                            <div class="col-12 grid-margin">
                                <div class="card">
                                    <div class="card-body admin-header-item">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h4 class="card-title">Users</h4>
                                            <button className="btn btn-success h-75" data-toggle="modal" data-target="#exampleModal">Add New User +</button>

                                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <h4 className='text-black-50'>Add New User</h4>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body py-1">

                                                            <div class="grid-margin stretch-card mb-0">
                                                                <div class="card border-0">
                                                                    <div class="card-body bg-white">

                                                                        <form class="forms-sample was-validated" onSubmit={e => e.preventDefault()}>
                                                                            <div class="form-group">
                                                                                <label for="inputUsername">Full Name</label>
                                                                                <input type="text" ref={fullNameRef} class="form-control" id="inputUsername" placeholder="Username" value={fullNameInput} onChange={e => setFullNameInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputEmail">Email</label>
                                                                                <input type="email" ref={emailRef} class="form-control" id="inputEmail" placeholder="Email" value={emailInput} onChange={e => setEmailInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputPassword">Password</label>
                                                                                <input type="password" ref={passwordRef} class="form-control" id="inputPassword" placeholder="Password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputRole">Role</label>
                                                                                <input type="text" ref={roleRef} class="form-control" id="inputRole" placeholder="Role" value={roleInput} onChange={e => setRoleInput(e.target.value)} required />
                                                                            </div>
                                                                        </form>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary" onClick={newUserApi}>Submit</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th> Full Name </th>
                                                        <th> Email </th>
                                                        <th>Role</th>
                                                        <th>_</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='user-info-list'>

                                                    {/* <SingleAdminUser fullName={"amirreza rostami"} email={"amirreza.rostami@gmail.com"} /> */}
                                                    {users.map(item => <SingleAdminUser fullName={item.fullName} email={item.email} role={item.role} id={item._id} />)}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ____End User List____ */}





                        {/* ____Start Food List____ */}
                        {/* <div class="row ">
                            <div class="col-12 grid-margin">
                                <div class="card">
                                    <div class="card-body admin-header-item">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h4 class="card-title">Foods</h4>
                                            <button className="btn btn-success h-75" data-toggle="modal" data-target="#exampleModal3">Add New Food +</button>

                                            <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <h4 className='text-black-50'>Add New Food</h4>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body py-1">

                                                            <div class="grid-margin stretch-card mb-0">
                                                                <div class="card border-0">
                                                                    <div class="card-body bg-white">

                                                                        <form class="forms-sample was-validated" onSubmit={e => e.preventDefault()}>
                                                                            <div class="form-group">
                                                                                <label for="inputUsername">Name</label>
                                                                                <input type="text" ref={fullNameRef} class="form-control" id="inputUsername" placeholder="Name" value={fullNameInput} onChange={e => setFullNameInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputEmail">Type</label>
                                                                                <input type="email" ref={emailRef} class="form-control" id="inputEmail" placeholder="Type" value={emailInput} onChange={e => setEmailInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputPassword">Price</label>
                                                                                <input type="password" ref={passwordRef} class="form-control" id="inputPassword" placeholder="Price" value={passwordInput} onChange={e => setPasswordInput(e.target.value)} required />
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="inputRole">Role</label>
                                                                                <input type="text" ref={roleRef} class="form-control" id="inputRole" placeholder="Role" value={roleInput} onChange={e => setRoleInput(e.target.value)} required />
                                                                            </div>
                                                                        </form>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary" onClick={newUserApi}>Submit</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th> Full Name </th>
                                                        <th> Email </th>
                                                        <th>Role</th>
                                                        <th>_</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='user-info-list'>

                                                    {users.map(item => <SingleAdminUser fullName={item.fullName} email={item.email} role={item.role} id={item._id} />)}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        {/* ____End Food List____ */}






                        <div class="row">
                            <div class="col-md-12 col-xl-7 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">

                                        <div class="d-flex flex-row justify-content-between">
                                            <h4 class="card-title">Contact us list</h4>
                                            <p class="text-muted mb-1 small">View all</p>
                                        </div>
                                        <div class="preview-list">

                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th className='text-white'> Full Name </th>
                                                            <th className="text-white"> Phone </th>
                                                            <th className="text-white"> Email </th>
                                                            <th className="text-white"> Answering </th>
                                                            <th className="text-white"> - </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='user-info-list'>

                                                        {contacts.map(item => <SingleAdminContact fullName={item.fullName} phone={item.phone} email={item.email} answering={item.answering} id={item._id} />)}

                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 col-xl-5 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">To do list</h4>
                                        <div class="add-items d-flex">
                                            <input type="text" class="form-control todo-list-input" placeholder="enter task.." />
                                            <button class="add btn btn-primary todo-list-add-btn">Add</button>
                                        </div>
                                        <div class="list-wrapper">
                                            <ul class="d-flex flex-column-reverse text-white todo-list todo-list-custom">

                                                {/* <SingleAdminTodo /> */}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </AdminLayout>

        </AdminContext.Provider>

    );
}

export default Admin;