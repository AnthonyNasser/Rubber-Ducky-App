import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function AddChatButton() {
    return (
        <div className="mb-10">
            <button className="bg-secondary-800 text-white font-black py-5 mb-1 w-full shadow-lg rounded-lg hover:bg-primary-200 transition duration-500 ease-in-out transform">
                <div className="flex flex-row align-middle justify-center items-center">
                    <span className="text-lg uppercase ml-3">Add Chat</span>
                    <FontAwesomeIcon icon={faAdd} className="ml-3" size="lg" />
                </div>
            </button>
        </div>
    )
}
