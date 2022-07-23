import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

export default function SignUpFormModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            {/* <button onClick={() => setShowModal(true)}>Sign Up</button> */}
            <Link onClick={() => setShowModal(true)}>Sign Up</Link>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
}
