import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ChatBox = () => {
    return (
        <button className="bg-secondary-800 text-white font-bold py-5 px-4 mb-1 w-1/6 shadow-lg ml-5">
            <FontAwesomeIcon icon={faUserCircle} className="mr-3" size="xl" />
            Chat 1
        </button>
    )
}

export default ChatBox
