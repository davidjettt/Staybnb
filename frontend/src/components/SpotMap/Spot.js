
import houseMarker from  '../../images/house-marker.svg'
import './SpotMap.css'

export default function Spot({ lat, lng, text }) {


    return (
        <div className='marker-circle-outer'>
            <div className='marker-circle'>
                <img className='marker-house' src={houseMarker} alt='marker' />
            </div>
        </div>
    )
}
