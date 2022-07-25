import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getSpotDetailsThunk } from '../../store/spots';

import './SpotDetail.css';

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId));
    }, [dispatch])

    // const spot = useSelector((state) => {
    //     return Object.values(state.spots);
    // })

    const spot = useSelector((state) => {
        // console.log('USE SELECTOR', state.spots)
        return state.spots[spotId]
    })


    console.log ('SPOT DETAILS', spot)
    // console.log ('SPOT IMAGES', spotImagesArr)
    return (
        <div className='spot-details-main-container'>
            <div className='spot-details-header-container'>
                <h1>{spot.name}</h1>
            </div>
            <div className='spot-images-container'>
                {spot.Images.map((image, idx) => (
                    // console.log('IMAGES', image.url)
                    <img key={idx} style={{width: 300}} src={`${image.url}`} />
                ))}
            </div>
        </div>
    )
}
