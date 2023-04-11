import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    chatTitle: string;

  };

const ChatBox = ({ chatTitle }: Props) => {
    return (
        // TODO: add onClick function to have previous chat pop up
        <button className="bg-secondary-800 text-white font-bold py-5 px-4 mb-1 shadow-lg ml-5">
            <FontAwesomeIcon icon={faUserCircle} className="mr-3" size="xl" />
            {chatTitle}
        </button>
    )
}

export default ChatBox
