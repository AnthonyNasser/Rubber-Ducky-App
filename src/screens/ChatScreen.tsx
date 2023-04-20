import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import {
    faAdd,
    faArrowLeft,
    faArrowLeftRotate,
    faArrowUp,
    faMessage,
    faPlaneUp,
    faUpLong,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import ChatBox from '../components/Chatbox'
import Message from '../components/Message'
import AddChatButton from '../components/AddChatForm'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fbFS } from '../services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useGlobalContext } from '../GlobalContext'

function ChatScreen() {
    const { id } = useParams()
    const globalContext = useGlobalContext()
    const [messages, setMessages] = useState<any>([])
    const [subject, setSubject] = useState<any>(null)
    const navigate = useNavigate()

    const navigateBack = () => {
        navigate('/chats')
    }

    const getDataFromContext = () => {
        setMessages(
            globalContext.currentUser.chats.find((chat: any) => chat.id === id)
                ?.messages
        )
        setSubject(
            globalContext.currentUser.chats.find((chat: any) => chat.id === id)
                ?.subject
        )
    }

    useEffect(() => {
        getDataFromContext()
    }, [])

    return (
        <div className={`${BG_STYLE} flex flex-col h-screen`}>
            <Navbar />
            <button
                className="text-secondary-800 font-black flex flex-row w-1/6 items-center"
                onClick={navigateBack}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="px-3"
                    size="xl"
                />
                <h2 className="text-xl">Go Back</h2>
            </button>
            <h1 className="text-2xl text-secondary-800 mb-3 font-bold mt-5 ml-5">
                Talking about {subject}...
            </h1>
            <div className="flex flex-row justify-center md:items-start w-full">
                <div
                    className="bg-secondary-50 w-full rounded-2xl mx-5 mb-10 h-full max-h-[600px] p-6 overflow-auto no-scrollbar"
                    id="interface"
                >
                    {messages?.map((message: any) => (
                        <div key={message.message}>
                            <Message
                                message={message.message}
                                isUser={message.isUser}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-center w-full">
                <div className="flex bg-[#93bddf] max-h-[125px] w-3/4 mt-10 rounded-2xl mb-12 h-64 shadow-lg border-2 border-[#5295cc]">
                    <textarea
                        className="bg-[transparent] break-words appearance-none border-red-500 rounded w-full h-full text-gray-700 mb-3 leading-tight px-5 py-5 focus:outline-0"
                        id="dialouge"
                    ></textarea>
                </div>
                <button className="text-secondary-800 font-black transition duration-500 ease-in-out transform">
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className="px-3"
                        size="2xl"
                    />
                </button>
            </div>
        </div>
    )
}

export default ChatScreen
