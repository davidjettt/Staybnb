import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import './SpotImagesModal.css'
// import { Modal } from '../../context/Modal'
import Modal from 'react-modal'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import backArrow from '../../images/back-arrow.svg'


const customStyles = {
    content: {
        position: 'absolute',
        outline: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    overlay: {
        backgroundColor: 'white',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 104
    }
};

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function SpotImagesModal({ showImagesModal, setShowImagesModal, images }) {

    const [ overflow, setOverflow ] = useState(false);

    useEffect(() => {
        if (!overflow && showImagesModal) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '15px';
        }
        return () => {
            document.body.style.overflow = 'visible'
            document.body.style.paddingRight = '0px';
        }
    }, [overflow, showImagesModal]);

    const handleClick = () => {
        setShowImagesModal(false)
    }

    return (
        <>
            {showImagesModal &&

            // <div className='spot-images-page'>


                <Modal
                    // onClose={() => setShowImagesModal(false)}
                    className='spot-images-modal'
                    isOpen={showImagesModal}
                    // onRequestClose={() => setShowImagesModal(false)}
                    // closeTimeoutMS={2000}
                    style={customStyles}
                    >
                    <img className='back-arrow' src={backArrow} onClick={handleClick} alt='back-arrow' />
                    <div className='spot-images-modal-main'>
                        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                            <ImageList variant="masonry" cols={1} gap={5}>
                                {images.map((item) => (
                                    <ImageListItem key={item.url}>
                                        <img
                                            src={`${item.url}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.url}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Box>
                    </div>
                </Modal>}
            {/* </div> */}
        </>
    )
}
