import React, { useContext, createContext, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';
import { motion } from 'framer-motion'

const ReviewModalContext = createContext();


export function ReviewModalProvider ({ children }) {
    const modalRef = useRef();
    const [ value, setValue ] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ReviewModalContext.Provider value={value}>
                {children}
            </ReviewModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function ReviewModal({ onClose, children }) {
    const modalNode = useContext(ReviewModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <motion.div id="review-modal">
        <motion.div id="review-modal-background" onClick={onClose}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
        />
        <motion.div id="review-modal-content"
            initial={{
                // scale: 0
                translateY: 500,

            }}
            animate={{
                // scale: 1
                translateY: -15,
                transitionDuration: '.2s',
            }}
        >
            {children}
        </motion.div>
        </motion.div>,
        modalNode
    );
}
