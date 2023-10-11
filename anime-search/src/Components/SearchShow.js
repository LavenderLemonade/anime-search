import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

export default function SearchShow() {

    const [stuff, setStuff] = useState([]);

    class AnimeInfo {
        constructor(title, synopsis, cover) {
            this.Title = title;
            this.Synopsis = synopsis;
            this.Cover = cover;
        }
    }

    class InfoFactory {
        createInfo(props) {
            return new AnimeInfo(props.title, props.synopsis, props.cover);
        }
    }

    const factory = new InfoFactory();

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    let url = 'https://kitsu.io/api/edge/anime?filter[text]=cowboy%20bebop';

    function doCall() {
        axios.get(url, config).then((response) => {
            console.log('length of the data is ' + response.data.data.length);
            for (let i = 0; i < response.data.data.length; i++) {
                setStuff(stuff => [...stuff, factory.createInfo({
                    title: response.data.data[i].attributes.canonicalTitle,
                    synopsis: response.data.data[i].attributes.synopsis,
                    cover: response.data.data[i].attributes.posterImage.large
                })]);
            }

        });


    }

    console.log(stuff);




    return (
        <div>
            <button className='text-5xl' onClick={() => doCall()}>try it </button>
            {stuff && <div>
                <p className='text-3xl'>Title : {stuff.Title}</p>
                <br></br>
                <p className='text-3xl'> Synopsis: {stuff.Synopsis}</p>
                <br></br>
                <img src={stuff.Cover}></img>
            </div>
            }

        </div>
    )
}
