import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'}>
            <div className='flex relative'>
                <img src={logo} alt="" />
                <h1 className=' absolute top-5 left-4 text-2xl font-extrabold '>proFast</h1>
            </div>
        </Link>
    );
};
export default Logo;