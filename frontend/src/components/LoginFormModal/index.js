import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

import SignUpFormModal from "../SignupFormModal";
import SignupForm from '../SignupFormModal/SignupForm';

import { Redirect, Link, useHistory } from 'react-router-dom';

import './LoginFormModal.css';

export default function LoginFormModal() {
    const [ showModal, setShowModal ] = useState(false);
    const [ showModal2, setShowModal2 ] = useState(false);

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [ className, setClassName ] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
        setClassName(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
        setShowMenu(false);
        setClassName(false);
        };

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu)};
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());

        history.push('/');
    };


    const dropIn = {
        hidden: {
            y: '-100vh',
            opacity: 0
        },
        visible: {
            y: '0'
        },
        exit: {
            y: '100vh',
            opacity: 0
        }
    }

    return (
        <div className='dropdown'>
                <div className='profile-button-container'>
                    <button className="profile-button" onClick={openMenu}>
                        <div className="sign-in-container">
                                <div className="three-lines-icon">
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible', marginLeft: 2, marginTop: 1}}><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                                </div>
                            <div className="profile-icon">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 26, width: 26, fill: 'currentcolor', marginLeft: 5}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                            </div>
                        </div>
                    </button>
                </div>

            <div className='main-dropdown-container'>
                <div className={className ? 'dropdown-menu' : 'off'}>
                    {showMenu && <div>
                        {sessionUser ? <div className='user-email'>{sessionUser.email}</div> : null}
                    </div>}
                    {showMenu && <div className='your-spots-container'>
                        {sessionUser ? <Link className='your-spots' to='/your-spots'>
                            Your Spots
                        </Link> : null}
                    </div>}
                    {showMenu && <div className='your-reviews-container'>
                        {sessionUser ? <Link className='your-reviews' to='/your-reviews'>
                            Your Reviews
                        </Link> : null}
                    </div>}
                    {showMenu && <div className='your-reviews-container'>
                        {sessionUser ? <Link className='your-reviews' to='/your-bookings'>
                            Your Bookings
                        </Link> : null}
                    </div>}
                    {showMenu && <div className='create-a-spot-container'>
                        {sessionUser ? <Link className='create-a-spot' to='/create-a-spot'>
                            Create a Spot
                        </Link> : null}
                    </div>}
                    {!sessionUser && <div className='dropdown-login-container'>
                        {showMenu && <button className='dropdown-login-button' onClick={() => {
                            setShowModal(true)}}>Log In</button> }
                    </div> }
                    {!sessionUser && <div className='dropdown-signup-container'>
                        {showMenu && <li> <button className='dropdown-signup-button' onClick={() => {
                            setShowModal2(true)}}>Sign Up</button> </li>}
                    </div>}
                    {showModal && (
                        <Modal variants={dropIn} closeTimeoutMS={1000} isOpen={showModal} onClose={() => setShowModal(false)}>
                            <LoginForm setShowModal={setShowModal}  />
                        </Modal>
                    )}
                    {showModal2 && (
                        <Modal onClose={() => setShowModal2(false)}>
                            <SignupForm setShowModal2={setShowModal2} />
                        </Modal>
                    )}
                    {showMenu && <div className='logout-container'>
                        {sessionUser ? <button className='logout' onClick={logout}>Log Out</button> : null}
                    </div>}
                </div>
            </div>
        </div>
    )
}
