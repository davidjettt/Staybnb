import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css';

import { Redirect } from "react-router-dom";


export default function LoginForm({ setShowModal }) {

    const dispatch = useDispatch();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errors, setErrors] = useState([]);



    const sessionUser = useSelector(state => state.session.user);

    // if (sessionUser) return (
    //         <Redirect to='/' />
    // )

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(sessionActions.login({ email, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.message) setErrors([data.message]);
            }
        );
    };

    const handleClick = () => {
        setShowModal(false)
    }

    const handleDemoUser = () => {
        setEmail('demo.user@demouser.io')
        setPassword('demouser')
    }

    return (
        <div>
            <header className="login-form-header">
                <div className="x-button-container">
                    <button onClick={handleClick} className="x-button-login" >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible'}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                    </button>
                </div>
                <div className="login-form-header-title-container">
                    <h1 className='login-form-header-title'>Log in</h1>
                </div>
                <div></div>
            </header>

            <div className="login-form-container">
                <div className="login-form-pane">
                    <div className="login-form-title-container">
                        <h3 className='login-form-title'>Welcome to Airbnb</h3>
                    </div>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='errors'>
                            <ul className="errors-list">
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                        <div className='input-container-main'>
                            <div className='input-container-sub'>
                                <div className="email-input-container">
                                    <label className="custom" htmlFor='box'>
                                        <input
                                            className='email-input-field email'
                                            id='box'
                                            type='text'
                                            // placeholder='Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <span className="placeholder">Email</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="custom-2">
                                        <input
                                            className='password-input-field'
                                            type='password'
                                            // placeholder='Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                        <span className="placeholder-2">Password</span>
                                    </label>
                                </div>
                                <div className="login-demo-buttons-container">
                                    <div className="login-button-container">
                                        <button className='login-button' type='submit'>Log In</button>
                                    </div>
                                    <div className="login-button-container">
                                        <button className='login-button' type='submit' onClick={handleDemoUser}>Demo User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
