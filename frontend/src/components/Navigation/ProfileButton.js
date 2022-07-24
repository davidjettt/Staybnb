import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import ProfileIconDropdown from "../ProfileIconDropdown";
import SignUpFormModal from "../SignupFormModal";
import './Navigation.css'


export default function ProfileButton({ user }) {
    console.log('I RERENDERED')
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
        setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener("click", closeMenu)};
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    // const test = (e) => {
    //     const ele = document.getElementsByClassName('test')[0]
    //     ele.addEventListener('focus', e => {
    //         console.log('test')
    //     })
    // }

    useEffect(() => {
        const listener = () => {
            console.log('test');
            setShowMenu(true)
            return (
                <LoginFormModal />
            )
        }
        if (showMenu) {
                const ele = document.getElementById('test')
                console.log(ele)
                ele.addEventListener('click', listener)
        }
    }, [showMenu])


    return (
        <>
            <button className="profile-button" onClick={openMenu}>
                <div className="sign-in-container">

                        <div className="three-lines-icon">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible'}}><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                        </div>
                    {/* <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{width: '40', height: '40'}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg> */}
                    <div className="profile-icon">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 26, width: 26, fill: 'currentcolor'}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                    </div>
                </div>
            </button>

            <div className="main-dropdown-container">
                {console.log('show menu', showMenu)}
                {showMenu && (
                    <div className="dropdown-menu">
                        <div className='profile-dropdown'>
                            {sessionUser ? <div>{user.email}</div> : null}
                            <div >
                                <LoginFormModal onClick={() => setShowMenu(true)} showMenu={showMenu} />
                            </div>
                            <div>
                                <SignUpFormModal />
                            </div>
                            <div>
                            {sessionUser ? <button onClick={logout}>Log Out</button> : null}
                            </div>
                        </div>
                    </div>
                    // <ProfileIconDropdown />

                )}
            </div>
        </>
    )
}
