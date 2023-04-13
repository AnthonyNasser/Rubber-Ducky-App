import { faUserCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type Props = {
    chatTitle: string;
    index: number;
    handleDeleteClick: (index: number) => void;
  };


const ChatBox = ({ chatTitle, index, handleDeleteClick }: Props) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    return (
        // TODO: add onClick function to have previous chat pop up
    <button className="bg-secondary-800 text-white font-bold py-5 px-4 mb-1 shadow-lg ml-5"
        style={{width: "200px", height: 'auto', wordWrap: "break-word" }} // set a fixed width
        onClick={() => setShowDeleteButton(true)}
        onMouseLeave={() => setShowDeleteButton(false)}
    >
    {showDeleteButton ? (
        <FontAwesomeIcon icon={faTimes} className="mr-3" size="xl" onClick={() => handleDeleteClick(index)} />
    ) : (
        <FontAwesomeIcon icon={faUserCircle} className="mr-3" size="xl" />
    )}
    {chatTitle}
    </button>
    )
}

export default ChatBox
