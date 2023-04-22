import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import {
    faArrowLeft,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons'
import Message from '../components/Message'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext'

function ChatScreen() {
    const { id } = useParams()
    const globalContext = useGlobalContext()
    const [messages, setMessages] = useState<any>([])
    const [message, setMessage] = useState<String>('')
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
            <div className="flex flex-row justify-center md:items-start w-full h-1/2">
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
            <div className="flex flex-row justify-center w-full fixed bottom-0">
                <div className="flex bg-quaternary-200 max-h-[125px] w-3/4 mt-10 rounded-2xl mb-12 h-64 shadow-lg">
                    <textarea
                        className="bg-[transparent] break-words appearance-none border-red-500 rounded w-full h-full text-gray-700 mb-3 leading-tight px-5 py-5 focus:outline-0"
                        id="dialouge"
                        placeholder="Do your best to answer the question..."
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <button className="text-white p-2 font-black transition duration-500 ease-in-out transform bg-primary-200 h-1/2 self-center hover:-translate-y-1 hover:scale-105 rounded-full w-1/8 items-center">
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
