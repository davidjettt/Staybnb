import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

import './SignupForm.css'

export default function SignupForm({ setShowModal2 }) {
    const dispatch = useDispatch();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    const handleClick = () => {
        setShowModal2(false);
    }


        return (
            <div>
                <header className="signup-form-header">
                    <div className="x-button-container">
                        <button className="x-button-signup" onClick={handleClick}>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'none', height: 16, width: 16, stroke: 'currentcolor', strokeWidth: 3, overflow: 'visible'}}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                        </button>
                    </div>
                    <div className="signup-form-header-title-container">
                        <h3 className='signup-form-header-title'>Sign Up</h3>
                    </div>
                    <div></div>
                </header>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='errors'>
                        <ul className="errors-list">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <div className='input-container'>
                        <div>
                            <label>

                                <input
                                    className='first-name-input'
                                    type='text'
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>

                                <input
                                    className='last-name-input'
                                    type='text'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label htmlFor='box'>

                                <input
                                    className='email-input-field email'
                                    id='box'
                                    type='text'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    className='password-input-field'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                        <label>

                            <input
                                className='confirm-pw-input-field'
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                        <div className="signup-button-container">
                            <button className='signup-button' type='submit'>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
}
