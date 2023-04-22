import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import {
    faArrowLeft,
    faArrowUp,
    faEdit,
} from '@fortawesome/free-solid-svg-icons'
import Message from '../components/Message'
import { createRef, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../GlobalContext'
import afroDucky from '../assets/anims/afro-ducky.json'
import computerGoose from '../assets/anims/computer-goose.json'
import vibratingDuck from '../assets/anims/vibrating-duck.json'
import whackAMole from '../assets/anims/whack-a-mole.json'
import Lottie from 'lottie-react'

function ChatScreen() {
    const { id } = useParams()
    const messagesEndRef = createRef<HTMLDivElement>()
    const globalContext = useGlobalContext()
    const [messages, setMessages] = useState<any>([])
    const [previousQuestions, setPreviousQuestions] = useState<any>([])
    const [message, setMessage] = useState<any>('')
    const [subject, setSubject] = useState<any>(null)
    const [newSubject, setNewSubject] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [currentLoadingAnim, setCurrentLoadingAnim] = useState<any>(afroDucky)
    const [showEditSubject, setShowEditSubject] = useState(true)
    const navigate = useNavigate()

    const navigateBack = () => {
        navigate('/chats')
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const chooseLoadingAnim = () => {
        const anims = [afroDucky, computerGoose, vibratingDuck, whackAMole]
        const randomIndex = Math.floor(Math.random() * anims.length)
        setCurrentLoadingAnim(anims[randomIndex])
    }

    const getDataFromContext = async () => {
        await globalContext.getAllChats()
        setMessages(
            globalContext.currentUser.chats.find((chat: any) => chat.id === id)
                ?.messages
        )
        setSubject(
            globalContext.currentUser.chats.find((chat: any) => chat.id === id)
                ?.subject
        )
        setNewSubject(subject)
    }

    const sendMessage = async () => {
        chooseLoadingAnim()
        setLoading(true)
        const msg = {
            message: message,
            isUser: true,
        }
        setMessages([...messages, msg])
        messages.forEach((message: any) => {
            if (!message.isUser) {
                setPreviousQuestions((previousQuestions: any) => [
                    ...previousQuestions,
                    message.message,
                ])
            }
        })
        setMessage('')
        console.log(msg)
        await globalContext.addMessage(
            id,
            subject,
            findLastQuestion(messages),
            msg,
            previousQuestions
        )
        await getDataFromContext()

        setLoading(false)
        scrollToBottom()
    }

    const findLastQuestion = (messages: any) => {
        let lastQuestion = ''
        messages.forEach((message: any) => {
            if (!message.isUser) {
                lastQuestion = message.message
            }
        })
        return lastQuestion
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
        scrollToBottom()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        chooseLoadingAnim()
        getDataFromContext()
    }, [])

    const handleChangeSubject = async () => {
        if (subject === null || subject === '') {
            setShowEditSubject(true)
            return
        } else if (subject === newSubject) {
            setShowEditSubject(true)
            return
        } else {
            await globalContext.changeSubject(id, newSubject)
            setSubject(newSubject)
            setShowEditSubject(true)
        }
    }

    return (
        <div className={`${BG_STYLE} flex flex-col h-screen`}>
            <Navbar />
            <button
                className="text-secondary-800 font-black hidden md:flex flex-row w-1/6 items-center"
                onClick={navigateBack}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="px-3"
                    size="xl"
                />
                <h2 className="text-xl">Back to Chats</h2>
            </button>
            {/* TODO: find a way to do this without negative margin */}
            <div className="flex flex-row w-full items-center justify-center -mt-2 mb-3">
                <h1 className="text-2xl text-secondary-800 font-bold">
                    Currently discussing {showEditSubject && subject}
                </h1>
                {showEditSubject ? (
                    <button
                        className="text-primary-800 font-black self-center"
                        onClick={() => setShowEditSubject(false)}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="px-3"
                            size="xl"
                        />
                    </button>
                ) : (
                    <div className="flex flex-row ml-3">
                        <input
                            type="text"
                            className="text-primary-800 font-black self-center py-3 px-3 rounded-2xl"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleChangeSubject()
                                }
                            }}
                        />
                        <button
                            className="text-primary-800 font-black self-center ml-3"
                            onClick={() => handleChangeSubject()}
                        >
                            Confirm
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-row justify-center md:items-start w-full h-3/4">
                <div
                    className="bg-secondary-50 w-full rounded-2xl mx-5 mb-10 h-5/6 md:h-5/6 p-6 overflow-auto no-scrollbar"
                    id="interface"
                >
                    {loading ? (
                        <div className="flex flex-col justify-center items-center align-middle">
                            <Lottie
                                animationData={currentLoadingAnim}
                                loop={true}
                                size={10}
                            />
                        </div>
                    ) : (
                        <div id="messages">
                            {messages?.map((message: any, index: number) => (
                                <div key={index}>
                                    <Message
                                        message={message.message}
                                        isUser={message.isUser}
                                    />
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-center w-full fixed bottom-0">
                <div className="flex bg-white max-h-[125px] w-11/12 md:w-3/4 mt-10 rounded-2xl mb-12 shadow-lg">
                    <textarea
                        className="bg-[transparent] break-words appearance-none border-red-500 rounded w-full h-full text-gray-700 mb-3 leading-tight px-5 py-5 focus:outline-0"
                        id="dialouge"
                        placeholder="Do your best to answer the question. If you don't know the answer, just take a wild guess!"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        value={message}
                    ></textarea>
                </div>
                <button
                    onClick={sendMessage}
                    className="hidden md:block text-white p-2 ml-4 font-black transition duration-500 ease-in-out transform bg-primary-200 h-1/2 self-center hover:-translate-y-1 hover:scale-105 rounded-full w-1/8 items-center"
                >
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
