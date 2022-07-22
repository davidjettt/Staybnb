import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';


export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                {/* <NavLink to='/login'>Log In</NavLink> */}
                <LoginFormModal />
                <NavLink to='/signup'>Sign Up</NavLink>
            </>
        );
    }

    return (
        <div>
            <ul>
                <li>
                    <NavLink exact to='/'>Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </div>
    )
}