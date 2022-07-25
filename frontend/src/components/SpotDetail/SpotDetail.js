import { useParams } from 'react-router-dom';

import './SpotDetail.css';

export default function SpotDetail() {
    const { spotId } = useParams();

    return (
        <>
            <h1>{`Hello from spot number ${spotId}`}</h1>
        </>
    )
}
