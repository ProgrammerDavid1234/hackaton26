import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
    return (
        <div className="flex flex-row gap-5">
            <h1 className="text-2xl font-bold">Landing</h1>
            {/* <div> */}
            <Link to="/login">
                <button className="bg-green-500 text-white p-3">Login</button>
            </Link>
        </div>

    )
}

export default Landing