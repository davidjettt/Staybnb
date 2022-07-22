import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

export default function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState([]);

    if (sessionUser) return (
        <Redirect to='/' />
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                const data = await res.json();
                // console.log(data)
                // if (data && data.errors) setErrors(data.errors)
                if (data && data.message) setErrors([data.message])
            })
    }

    return (
        <>
            <h3 className='login-page-title'>Welcome to Airbnb</h3>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='errors'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className='input-container'>
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
                                className='email-input-field'
                                type='text'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className='login-button' type='submit'>Log In</button>
                </div>
            </form>
        </>
    )
}
