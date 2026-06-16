import React from 'react'
import { Link } from 'react-router'
const Login = () => {
    return (
        <div>
            <div>Login</div>
            <Link to="/dashboard">
                <button className="bg-blue-500 text-white p-3">Dashboard</button>
            </Link>
        </div>

    )
}

export default Login