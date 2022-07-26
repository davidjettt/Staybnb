import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SpotForm from '../SpotForm/SpotForm';

export default function EditSpotForm () {
    const { spotId } = useParams();

    const spots = useSelector(state => state.spots);

    const spot = spots[spotId];

    return (
        <SpotForm spot={spot} formType='Update Spot' />
    )
}
