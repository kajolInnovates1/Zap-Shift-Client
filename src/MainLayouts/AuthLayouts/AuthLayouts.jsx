import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../../Pages/Shared/Logo/Logo';
import img from '../../assets/authimage.png'

const AuthLayouts = () => {
    return (
        <div className="bg-base-200 px-8">
            <div>
                <Logo></Logo>
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={img}
                    className="max-w-sm rounded-lg shadow-2xl flex-1"
                />
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>


            </div>
        </div>
    );
};

export default AuthLayouts;