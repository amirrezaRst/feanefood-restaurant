import React from 'react';



const SinglePaymentFood = ({ name, count, price, pic }) => {
    const imageUrl = `http://localhost:3000/${pic}`

    return (
        <tr>
            <td className='w-25 h-25 text-black-50'><img src={imageUrl} className='w-75 h-75' alt="" /></td>
            <td className='text-black-50' style={{ width: "35%", paddingTop: "40px" }}><h4>{name}</h4></td>
            <td className='text-black-50' style={{ paddingTop: "40px" }}><h4>{count}</h4></td>
            <td className='text-black-50' style={{ paddingTop: "40px" }}><h4>{price * count} $</h4></td>
        </tr>
    );
}

export default SinglePaymentFood;