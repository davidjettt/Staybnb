import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

export default function LoginFormModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {console.log('show modal', showModal)}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}
