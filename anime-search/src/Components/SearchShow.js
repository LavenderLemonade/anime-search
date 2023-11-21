import { useState } from 'react'
import React from 'react'
import axios from 'axios';
import { createPortal } from 'react-dom';
import ModalPopup from './ModalPopup';

export default function SearchShow() {

    const [animeList, setAnimeList] = useState([]);
    const [currentAnime, setCurrentAnime] = useState(null);
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);

    class AnimeInfo {
        constructor(id, title, synopsis, cover, episodes, rating, startDate, endDate) {
            this.Id = id;
            this.Title = title;
            this.Synopsis = synopsis;
            this.Cover = cover;
            this.Episodes = episodes;
            this.Rating = rating;
            this.StartDate = startDate;
            this.EndDate = endDate;
        }
    }

    class AnimeInfoFactory {
        createInfo(props) {
            return new AnimeInfo(props.id, props.title, props.synopsis, props.cover, props.episodes, props.rating, props.startDate, props.endDate);
        }
    }

    const factory = new AnimeInfoFactory();

    let config = {
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json'
        }
    };

    let baseUrl = 'https://kitsu.io/api/edge/anime?filter[text]=';

    function doCall(searchWord) {
        axios.get(baseUrl + encodeURI(searchWord), config).then((response) => {
            for (let i = 0; i < response.data.data.length; i++) {
                setAnimeList(animeList => [...animeList, factory.createInfo({
                    id: response.data.data[i].id,
                    title: response.data.data[i].attributes.canonicalTitle,
                    synopsis: response.data.data[i].attributes.synopsis,
                    cover: response.data.data[i].attributes.posterImage.large,
                    episodes: response.data.data[i].attributes.episodeCount,
                    rating: response.data.data[i].attributes.averageRating,
                    startDate: response.data.data[i].attributes.startDate,
                    endDate: response.data.data[i].attributes.endDate

                })]);
            }

            console.log(response.data.data[0].attributes);
        });
    }

    console.log(animeList[0]);

    return (
        <div>
            <input
                className='outline outline-black'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className='text-2xl' onClick={() => doCall(search)}> Search </button>

            <div className='flex flex-wrap'>
                {animeList && animeList.map((anime, id) =>
                    <div className='max-w-sm m-2 border-black border-2 flex flex-col' key={id}>
                        <img src={anime.Cover}></img>
                        <p className='text-sm self-center'>{anime.Title}</p>
                        <br></br>
                        <div className='flex w-full '>
                            <p className='text-sm justify-self-start'> eps: {anime.Episodes}</p>
                            <p className='text-sm justify-self-end'> Rating {anime.Rating}</p>
                        </div>

                        <button onClick={() => { setOpenModal(true); setCurrentAnime(id); }}>More Info...</button>
                    </div>

                )}
            </div>

            {openModal && createPortal(
                <ModalPopup open={openModal}
                    title={animeList[currentAnime].Title}
                    image={animeList[currentAnime].Cover}
                    synopsis={animeList[currentAnime].Synopsis}
                    onClose={() => setOpenModal(false)} />, document.body
            )}

        </div>
    )
}
