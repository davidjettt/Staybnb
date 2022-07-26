

import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

export default function StarRating () {
    const [ rating, setRating ] = useState(0);

    const newRating = (rate) => {
        setRating(rate)
    }

    return (
            <Rating
                initialValue={0}
                onClick={newRating}
                fillColor='gold'
                transition={true}
            />


    )
}
