import React, { useContext, createContext, useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import './Modal.css';
import {motion} from 'framer-motion'

const ModalContext = createContext();


export function ModalProvider ({ children }) {
    const modalRef = useRef();
    const [ value, setValue ] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <motion.div id="modal">
        <motion.div id="modal-background" onClick={onClose}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
        />
        <motion.div id="modal-content"
            initial={{
                // scale: 0
                translateY: 100
            }}
            animate={{
                // scale: 1
                translateY: -20
            }}
        >
            {children}
        </motion.div>
        </motion.div>,
        modalNode
        // <div id="modal">
        //     <div id="modal-background" onClick={onClose} />
        //     <div id="modal-content">
        //         {children}
        //     </div>
        // </div>,
        // modalNode
    );
}
