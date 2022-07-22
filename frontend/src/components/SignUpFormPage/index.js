import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import './SignupForm.css';

export default function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

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


    return (
        <div>
            <h3 className='login-page-title'>Sign Up</h3>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='errors'>
                    <ul className='errors'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='input-container'>
                    <div>
                        <label>
                            First Name
                            <input
                                className=''
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
                            Last Name
                            <input
                                className=''
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
                            Email
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
                            Password
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
                            Confirm Password
                            <input
                                className='confirm-pw-input-field'
                                type='password'
                                placeholder='Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className='signup-button' type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
