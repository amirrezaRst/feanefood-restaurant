import React from 'react';


const SingleAdminTodo = () => {
    return (
        <div className='todo-list-item'>
            <div>
                Pick up kids from school
            </div>
            <div className='float-right'>
                <button className='btn-delete btn btn-danger'><i className="fa fa-trash-can"></i></button>
            </div>
        </div>
    );
}

export default SingleAdminTodo;