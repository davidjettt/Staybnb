
import Map from '../Map/Map'
import './SpotMap.css'


export default function SpotMap({ spot }) {

    console.log(spot)

    return (
        <div className='spot-map-main'>
            <div className='spot-map-title'>
                Where you'll be
            </div>
            <Map spot={spot} />
            <div className='spot-map-location'>
                {spot.city}, {spot.state}, {spot.country}
            </div>
        </div>
    )
}
