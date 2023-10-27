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
        constructor(id, title, synopsis, cover) {
            this.Id = id;
            this.Title = title;
            this.Synopsis = synopsis;
            this.Cover = cover;
        }
    }

    class AnimeInfoFactory {
        createInfo(props) {
            return new AnimeInfo(props.id, props.title, props.synopsis, props.cover);
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
                    cover: response.data.data[i].attributes.posterImage.large
                })]);
            }
        });
    }

    return (
        <div>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <button className='text-5xl' onClick={() => doCall(search)}>try it </button>

            <div className='flex flex-wrap'>
                {animeList && animeList.map((anime, id) =>
                    <div className='max-w-sm p-3 m-2 border-black border-2 flex flex-col' key={id}>
                        <p> {id}</p>
                        <button onClick={() => { setOpenModal(true); setCurrentAnime(id); }}>ModalOpen</button>
                        <p className='text-lg self-center '>{anime.Title}</p>
                        <br></br>
                        <img src={anime.Cover}></img>
                        <br></br>
                        <p className='text-sm line-clamp-3'> Synopsis: {anime.Synopsis}</p>

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
