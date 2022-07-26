import SpotForm from "../SpotForm/SpotForm";

export default function CreateSpotForm() {
    const spot = {
        address: '',
        city: '',
        state:'',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: ''
    }

    return (
        <SpotForm spot={spot} formType='Create Spot' />
    )
}
