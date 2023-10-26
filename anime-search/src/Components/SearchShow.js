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
        axios.get(url + encodeURI(searchWord), config).then((response) => {
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

            <div className='flex flex-wrap'>
                {stuff && stuff.map((anime, id) =>
                    <div className='max-w-sm p-3 m-2 border-black border-2 flex flex-col' key={id}>
                        <p> {id}</p>
                        <p className='text-lg self-center '>{anime.Title}</p>
                        <br></br>
                        <img src={anime.Cover}></img>
                        <br></br>
                        <p className='text-sm line-clamp-3'> Synopsis: {anime.Synopsis}</p>

                    </div>
                )}
            </div>




        </div>
    )
}
