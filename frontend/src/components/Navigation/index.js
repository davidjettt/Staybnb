import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from './staybnb-logo-5.jpg'


export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (

            <LoginFormModal />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />

            </>
        );
    }

    return (
        <div className='navigation-main'>
            <div className='navigation-container'>
                <div className='logo-container'>
                    <NavLink className={'main-logo'} exact to='/'>
                        <img className='staybnb' src={logo} />
                    </NavLink>
                </div>
                    {sessionLinks}
                    {/* {isLoaded && sessionLinks} */}
                    {/* <LoginFormModal /> */}
            </div>
        </div>
    )
}
