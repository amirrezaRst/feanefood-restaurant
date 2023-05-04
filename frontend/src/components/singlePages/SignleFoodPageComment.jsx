import React, { useEffect, useState } from 'react';


const SingleFoodPageComment = ({ userName, userScore, userText, userTime, userId }) => {
    const [mount, setMount] = useState(null)
    const [day, setDay] = useState(null)
    const [year, setYear] = useState(null)

    useEffect(() => {
        setMount(userTime[0])
        setDay(userTime[1])
        setYear(userTime[2])
    }, [])


    return (
        <article className='p-3 rounded my-4' style={{ background: "#222831", color: "#ffffff" }}>

            <div className="d-flex justify-content-between align-items-baseline">
                <div className="d-flex">
                    <p className="h5" style={{ fontWeight: "600" }}>{userName}</p>
                    <p className='ml-5 text-white-50'>{`${day} ${mount == 1 ? "jan" : mount == 2 ? "feb" : mount == 3 ? "mar" : mount == 4 ? "apr" : mount == 5 ? "may" : mount == 6 ? "jun" : mount == 7 ? "jul" : mount == 8 ? "aug" : mount == 9 ? "sep" : mount == 10 ? "oct" : mount == 11 ? "noc" : mount == 12 ? "dec" : ""} ${year}`}</p>
                </div>
                <div className="">
                    <span className='m-1' style={{ fontSize: "1.3rem" }}>{userScore}</span><i className="fa fa-star" style={{ color: "#ffbe33" }}></i>
                </div>
            </div>
            <div className="">
                <p>{userText}</p>
            </div>

            {/* <button className="btn btn-primary" onClick={show}>Show</button> */}

        </article>
    );
}

export default SingleFoodPageComment;