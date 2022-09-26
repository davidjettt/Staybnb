import xBtn from '../../images/image-remove-x.svg'
// import xBtn from '../../images/x-button.svg'

export default function ImageRemoveBtn ({idx, images, previewImages, setImages, setPreviewImages }) {
    const removeImg = () => {
        const imagesCopy = images.slice()
        const previewImagesCopy = previewImages.slice()
        previewImagesCopy.splice(idx, 1)
        imagesCopy.splice(idx, 1)

        setPreviewImages(previewImagesCopy)
        setImages(imagesCopy)
    }

    return (
        <img className='image-x-btn' src={xBtn} onClick={removeImg}  alt='' />
    )
}
