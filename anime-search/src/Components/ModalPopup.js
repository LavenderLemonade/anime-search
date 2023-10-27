import React from 'react'

export default function ModalPopup({ open, onClose }) {

    if (!open) return null

    return (
        <div className='text-6xl'>
            Modal
            <button onClick={onClose}>Close</button>
        </div>
    )
}
