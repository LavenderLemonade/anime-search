import { useState } from 'react'
import React from 'react'
import axios from 'axios';

export default function SearchShow() {

    const [query, setQuery] = useState(null);

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    axios.get('https://kitsu.io/api/edge/anime?filter[text]=cowboy%20bebop', config).then((response) => {
        setQuery(response.data.data[0].attributes.canonicalTitle);
    })

    console.log(query);


    return (
        <div>

            <p className='text-3xl'>{query}</p>

        </div>
    )
}
