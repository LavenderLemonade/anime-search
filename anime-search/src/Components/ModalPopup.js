import React from 'react'

export default function ModalPopup({ open, onClose, title, image, synopsis }) {

    if (!open) return null

    return (
        <div className='text-6xl flex justify-evenly items-center 
        shadow bg-white border-black border-2 rounded-xl
        absolute top-20 left-10 bottom-70 w-13 z-9999'>
            Modal
            <button onClick={onClose}>Close</button>
            <br></br>
            <p className='text-3xl'> {title} </p>
            <img src={image}></img>
            <p className='text-sm'>{synopsis}</p>
        </div>
    )
}