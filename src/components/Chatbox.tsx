import React from 'react'
import { useNavigate } from 'react-router-dom'

const ducky = require('../assets/images/DuckyLogo.png')

type ChatBoxProps = {
    id: string
    subject: string
}

const ChatBox = (props: ChatBoxProps) => {
    const { subject, id } = props
    const navigate = useNavigate()
    const navigateToChat = () => {
        navigate(`/chats/${id}`)
    }
    return (
        <button
            onClick={navigateToChat}
            className="bg-secondary-200 text-white font-bold py-5 mb-1 w-full rounded-lg hover:bg-secondary-800 transition duration-500 ease-in-out transform hover:scale-105"
        >
            <div className="flex flex-row align-middle justify-center items-center">
                <img src={ducky} alt="profile" className="w-10" />
                <span className="text-lg ml-3 font-black">{subject}</span>
            </div>
        </button>
    )
}

export default ChatBox
