import { useDispatch } from 'react-redux'
import xBtn from '../../images/image-remove-x.svg'
import { deleteSpotImageThunk } from '../../store/spots'
// import xBtn from '../../images/x-button.svg'

export default function ImageRemoveBtn ({ spot, imgId, idx, images, previewImages, setImages, setPreviewImages, formType }) {
    const dispatch = useDispatch()
    const removeImg = () => {
        const imagesCopy = images.slice()
        const previewImagesCopy = previewImages.slice()
        previewImagesCopy.splice(idx, 1)
        imagesCopy.splice(idx, 1)

        setPreviewImages(previewImagesCopy)
        setImages(imagesCopy)
    }

    const removeImgEditSpot = async () => {
        // console.log('IMG ID', imgId)
        const data = await dispatch(deleteSpotImageThunk(imgId, spot))
        // console.log('DATA', data)
        const imagesObj = []

        data.Images?.forEach(img => {
            imagesObj.push(img.url)
        })

        setPreviewImages(imagesObj)
    }

    return (
        <img className='image-x-btn' src={xBtn} onClick={formType === 'Create a Spot' ? removeImg : removeImgEditSpot}  alt='' />
    )
}
