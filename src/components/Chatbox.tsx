import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext'

const ducky = require('../assets/images/DuckyLogo.png')

type ChatBoxProps = {
    id: string
    subject: string
}

const ChatBox = (props: ChatBoxProps) => {
    const { subject, id } = props
    const navigate = useNavigate()
    const globalContext = useGlobalContext()
    const navigateToChat = () => {
        navigate(`/chats/${id}`)
    }
    return (
        <div className="flex flex-row">
            <button
                onClick={navigateToChat}
                className="bg-secondary-200 text-white font-bold py-5 mb-1 w-full rounded-l-xl hover:bg-secondary-800 transition duration-500 ease-in-out"
            >
                <div className="flex flex-row align-middle justify-center items-center">
                    <img src={ducky} alt="profile" className="w-10" />
                    <span className="text-lg ml-3 font-black">{subject}</span>
                </div>
            </button>
            <button
                onClick={() => globalContext.removeChat(id)}
                className="bg-primary-300 text-white font-bold py-5 mb-1 w-1/12 rounded-r-xl hover:bg-primary-800 transition duration-500 ease-in-out transform hover:scale-105"
            >
                <FontAwesomeIcon icon={faTrash} className="ml-3" size="xl" />
            </button>
        </div>
    )
}

export default ChatBox
