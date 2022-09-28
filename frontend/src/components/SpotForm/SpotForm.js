import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpotThunk, editSpotThunk, uploadSpotImageThunk } from '../../store/spots';
import plusSign from '../../images/plus-sign.svg'
import './SpotForm.css'
import ImageRemoveBtn from '../ImageRemoveBtn/ImageRemoveBtn';

export default function SpotForm({ spot, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let imagesObj = {}

    if (spot?.Images) {
        spot.Images?.forEach(img => {
            imagesObj[img.url] = img.id
        })
    }

    console.log('OBJ', imagesObj)

    const [ address, setAddress ] = useState(spot?.address);
    const [ city, setCity ] = useState(spot?.city);
    const [ state, setState ] = useState(spot?.state);
    const [ country, setCountry ] = useState(spot?.country);
    const [ lat, setLat ] = useState(spot?.latitude || '');
    const [ lng, setLng ] = useState(spot?.longitude || '');
    const [ name, setName ] = useState(spot?.name);
    const [ description, setDescription ] = useState(spot?.description);
    const [ price, setPrice ] = useState(spot?.pricePerNight || '');
    // const [ previewImage, setPreviewImage ] = useState(spot?.previewImage || '');
    const [ images, setImages ] = useState([])
    const [ previewImages, setPreviewImages ] = useState(Object.keys(imagesObj) || [])
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        spot = {
            ...spot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            // previewImage
        }

        if (formType === 'Create a Spot' && images.length < 1) {
            setErrors(['At least 1 image is required'])
            return
        }

        if (formType === 'Create a Spot') {
            const spotData = await dispatch(createSpotThunk(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data) setErrors(data.errors || [data.message]);
                    return;
                }
            );

            if (spotData) {
                await dispatch(uploadSpotImageThunk(images, spotData.id))
                history.push(`/spots/${spotData.id}`);
            }

        } else {
            const spotData = await dispatch(editSpotThunk(spot)).catch(
                async (res) => {
                    const data = await res.json();
                    if (data) setErrors(data.errors || [data.message])
                }
            );
            if (spotData) {
                // dispatch(getAllSpotsThunk())
                history.push(`/spots/${spot.id}`)
            }
        }
    };

    function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const updateImage = async (e) => {
        setErrors([])
        const file = e.target.files[0]
        if (file) {
            if (formType === 'Create a Spot') {
                if (await isImgUrl(URL.createObjectURL(file))) {
                    if (previewImages.length < 5) {
                        setPreviewImages([...previewImages, URL.createObjectURL(file)])
                        setImages([...images, file])
                    }
                    else {
                        setErrors(['Max of 5 images is allowed'])
                    }
                }
                else {
                    setErrors(['Invalid image file type'])
                }
            } else {
                if (await isImgUrl(URL.createObjectURL(file))) {
                    if (previewImages.length < 5) {
                        // setImages(file)
                        const data = await dispatch(uploadSpotImageThunk([file], spot.id))
                        if (data) {
                            imagesObj = {}
                            data.Images?.forEach(img => {
                                imagesObj[img.url] = img.id
                            })
                            setPreviewImages(Object.keys(imagesObj))
                        }
                    } else {
                        setErrors(['Max of 5 images is allowed'])
                    }
                } else {
                    setErrors(['Invalid image file type'])
                }
            }
        }
    }

    return (
        <>
            <div className="create-spot-form-container">
                <div className="create-spot-form-pane">
                    <div className="create-spot-form-title-container">
                        <h3 className='create-spot-form-title'>{formType}</h3>
                    </div>
                    <div className='spot-errors'>
                        <ul className="spot-errors-list">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <form className='create-spot-form' onSubmit={handleSubmit}>
                        <div className='input-container-main'>
                            <div className='input-container-sub'>
                                <div className="address-input-container">
                                    <label className='custom-2'>
                                        <input
                                            className='address-input-field'
                                            type='text'
                                            // placeholder='Address'
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Address</span>
                                    </label>
                                </div>
                                <div className='city-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='city-input-field'
                                            type='text'
                                            // placeholder='City'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>City</span>
                                    </label>
                                </div>
                                <div className='state-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='state-input-field'
                                            type='text'
                                            // placeholder='State'
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>State</span>
                                    </label>
                                </div>
                                <div className='country-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='country-input-field'
                                            type='text'
                                            // placeholder='Country'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Country</span>
                                    </label>
                                </div>
                                <div className='lat-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='lat-input-field'
                                            type='text'
                                            // placeholder='Latitude'
                                            value={lat}
                                            onChange={(e) => setLat(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Latitude</span>
                                    </label>
                                </div>
                                <div className='lng-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='lng-input-field'
                                            type='text'
                                            // placeholder='Longitude'
                                            value={lng}
                                            onChange={(e) => setLng(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Longitude</span>
                                    </label>
                                </div>
                                <div className='name-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='name-input-field'
                                            type='text'
                                            // placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Name</span>
                                    </label>
                                </div>
                                <div className='description-input-container'>
                                    <label className='custom-2'>
                                        <textarea
                                            className='description-input-field'
                                            type='text'
                                            placeholder='Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                        {/* <span className='placeholder-2'>Description</span> */}
                                    </label>
                                </div>
                                <div className='price-input-container'>
                                    <label className='custom-2'>
                                        <input
                                            className='price-input-field'
                                            type='text'
                                            // placeholder='Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                        <span className='placeholder-2'>Price</span>
                                    </label>
                                </div>
                                {/* <div>
                                    <label className='custom-2'>
                                        <input
                                            type='url'
                                            required
                                            value={previewImage}
                                            onChange={(e) => {
                                                setPreviewImage(e.target.value)}}
                                        />
                                        <span className='placeholder-2'>Preview Image</span>
                                    </label>
                                </div> */}
                                <div className='spot-form-image-upload-container'>
                                    <div className='spot-form-image-title'>Add Spot Images</div>
                                    <div className='file-input-container'>
                                        <label className='image-file-label'>
                                            <img className='plus-sign' src={plusSign} alt='plus sign' />
                                            <input
                                                className='image-file-input'
                                                type='file'
                                                multiple
                                                onChange={updateImage}
                                            />
                                        </label>
                                        {previewImages.map((image, idx) => (
                                            <div className='image-container' key={idx}>
                                                <img className='preview-image' src={image} alt='spot' />
                                                <ImageRemoveBtn
                                                    spot={spot}
                                                    imgId={imagesObj[image]}
                                                    formType={formType}
                                                    idx={idx}
                                                    images={images}
                                                    setImages={setImages}
                                                    previewImages={previewImages}
                                                    setPreviewImages={setPreviewImages}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="create-spot-button-container">
                                    <button className='login-button' type='submit'>{formType}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
