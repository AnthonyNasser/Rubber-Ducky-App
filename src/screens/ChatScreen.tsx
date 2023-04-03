import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import ChatBox from '../components/Chatbox'

function ChatScreen() {
    return (
        <div className={`${BG_STYLE}`}>
            <Navbar />
            <div className="flex flex-col h-screen">
                <button className="bg-secondary-200 text-white font-bold py-5 px-4 rounded-2xl w-1/6 shadow-lg ml-5 mb-5 mt-10">
                    <FontAwesomeIcon icon={faAdd} className="mr-3" size="lg" />
                    <span className="text-lg uppercase">Create a Chat</span>
                </button>
                <ChatBox />
                <ChatBox />
            </div>
        </div>
    )
}

export default ChatScreen
