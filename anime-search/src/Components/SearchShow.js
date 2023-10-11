import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

export default function SearchShow() {

    const [stuff, setStuff] = useState(null);

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    let url = 'https://kitsu.io/api/edge/anime?filter[text]=cowboy%20bebop';

    function doCall() {
        axios.get(url, config).then((response) => {
            setStuff(response.data.data[0]);
        });

        console.log(stuff);
    }




    return (
        <div>
            <button className='text-5xl' onClick={() => doCall()}>try it </button>
            {stuff && <div>
                <p className='text-3xl'>Title : {stuff.attributes.canonicalTitle}</p>
                <br></br>
                <p className='text-3xl'> Synopsis: {stuff.attributes.synopsis}</p>
                <br></br>
                <p className='text-3xl'> number of Episodes: {stuff.attributes.episodes}</p>
            </div>
            }

        </div>
    )
}
