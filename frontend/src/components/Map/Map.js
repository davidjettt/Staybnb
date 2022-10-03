import GoogleMapReact from 'google-map-react'
import Spot from '../SpotMap/Spot'
import './Map.css'

export default function Map({ spot }) {

    const defaultProps = {
        center: {
            lat: spot.latitude,
            lng: spot.longitude
        },
        zoom: 12
    }

    // console.log('MAP RENDER')


    return (
        <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAP_API_KEY,
                    language: 'en'
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                // onChildMouseEnter={true}
                // onChildMouseLeave={true}
            >
                <Spot lat={spot.latitude} lng={spot.longitude} text='Here' />
            </GoogleMapReact>
        </div>
    )
}
