import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

export default function SignUpFormModal() {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button style={{ background: 'transparent', borderColor: 'white' }} onClick={() => setShowModal(true)}>Sign Up</button>
            {/* <Link onClick={() => setShowModal(true)}>Sign Up</Link> */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
}
