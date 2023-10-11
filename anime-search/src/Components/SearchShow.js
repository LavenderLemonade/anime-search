import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

export default function SearchShow() {

    const [stuff, setStuff] = useState([]);
    const [word, setWord] = useState('');

    class AnimeInfo {
        constructor(id, title, synopsis, cover) {
            this.Id = id;
            this.Title = title;
            this.Synopsis = synopsis;
            this.Cover = cover;
        }
    }

    class InfoFactory {
        createInfo(props) {
            return new AnimeInfo(props.id, props.title, props.synopsis, props.cover);
        }
    }

    const factory = new InfoFactory();

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    let url = 'https://kitsu.io/api/edge/anime?filter[text]=';
    let show = 'sword art';
    let newurl = url + encodeURI(show);

    function doCall(searchWord) {
        axios.get(url + encodeURI(word), config).then((response) => {
            console.log('length of the data is ' + response.data.data.length);
            for (let i = 0; i < response.data.data.length; i++) {
                setStuff(stuff => [...stuff, factory.createInfo({
                    id: response.data.data[i].id,
                    title: response.data.data[i].attributes.canonicalTitle,
                    synopsis: response.data.data[i].attributes.synopsis,
                    cover: response.data.data[i].attributes.posterImage.large

                })]);
            }
            console.log(response.data.data);

        });


    }

    return (
        <div>
            <input
                value={word}
                onChange={e => setWord(e.target.value)}
            />
            <button className='text-5xl' onClick={() => doCall(word)}>try it </button>
            {stuff && stuff.map((anime, id) =>
                <div key={id}>
                    <p className='text-3xl'>Title : {anime.Title}</p>
                    <br></br>
                    <p className='text-3xl'> Synopsis: {anime.Synopsis}</p>
                    <br></br>
                    <img src={anime.Cover}></img>
                </div>
            )}

        </div>
    )
}
