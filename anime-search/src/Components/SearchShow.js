import { useState } from 'react'
import React from 'react'
import axios from 'axios';

export default function SearchShow() {

    const [title, setTitle] = useState(null);
    const [synopsis, setSynopsis] = useState(null);
    const [episodes, setEpisodes] = useState(null);

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    let url = 'https://kitsu.io/api/edge/anime?filter[text]=cowboy%20bebop';

    axios.get(url, config).then((response) => {
        setTitle(response.data.data[0].attributes.canonicalTitle);
        setSynopsis(response.data.data[0].attributes.synopsis);
        setEpisodes(response.data.data[0].attributes.episodeCount);

    })

    console.log(title);


    return (
        <div>
            <p className='text-3xl'>Title : {title}</p>
            <br></br>
            <p className='text-3xl'> Synopsis: {synopsis}</p>
            <br></br>
            <p className='text-3xl'> number of Episodes: {episodes}</p>
        </div>
    )
}
