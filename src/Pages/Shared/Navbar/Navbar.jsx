import React from 'react';
import { NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import UseAuth from '../../../Hooks/UserAuth/UseAuth';

const Navbar = () => {
    const { user, logout, setUser } = UseAuth();
    const handleLogout = () => {
        logout();
        setUser(null);

    }
    console.log(user);
    const NavItems = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/sendparcel'}>Add Parcel</NavLink></li>
                <li><NavLink to={'/dashboard'}>DashBoard</NavLink></li>
            </>
        }

    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            NavItems
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><Logo></Logo></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        NavItems
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <>
                            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="btn btn-primary mr-2">Login</button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="btn btn-primary">Register</button>
                            </NavLink>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;