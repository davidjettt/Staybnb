import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

export default function SignupForm() {
    const dispatch = useDispatch();
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password })).catch(
            async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            }
            );
        };

        return (
            <div>
                <h3 className='signup-page-title'>Sign Up</h3>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='errors'>
                        <ul className="errors-list">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <div className='input-container'>
                        <div>
                            <label>
                                First Name
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
                                Last Name
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
                        <button className='signup-button' type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        )
}
