import React from 'react'

export default function ModalPopup({ open, onClose, title, image, synopsis }) {

    if (!open) return null

    return (
        <div className='text-6xl flex justify-evenly items-center 
        shadow bg-white border-white border-2 rounded-xl
        absolute w-62 top-70 left-[calc(50%-125px)] bottom-70'>
            Modal
            <button onClick={onClose}>Close</button>
            <br></br>
            <p className='text-3xl'> {title} </p>
            <img src={image}></img>
            <p className='text-md'>{synopsis}</p>
        </div>
    )
}
