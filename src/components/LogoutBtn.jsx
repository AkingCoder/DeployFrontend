import useLogout from '../hooks/userHooks/useLogout';
import React from 'react'
import Button from './Button';

const LogoutBtn = ({
    bgColor = 'bg-blue-600',
    textColor = "text-white",
    className = "",
    ...props
}) => {
    const { logout } = useLogout()
    return (
        <button onClick={() => logout()} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `}{...props}>
            Log out
        </button>
    )
}

export default LogoutBtn
