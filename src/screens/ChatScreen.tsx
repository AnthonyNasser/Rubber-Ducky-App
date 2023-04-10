import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import ChatBox from '../components/Chatbox'
import ChatInterface from '../components/ChatInterface'
import ChatDialouge from '../components/ChatDialouge'

function ChatScreen() {
    return (
        <div className={`${BG_STYLE} flex flex-col min-h-screen`}>
            <Navbar />
            <div className="flex flex-row flex-grow h-full">
                <div className="flex flex-col h-full w-1/6" id="chatList">
                    <button className="bg-secondary-200 text-white font-bold py-5 px-4 rounded-2xl shadow-lg ml-5 mb-5 mt-10">
                        <FontAwesomeIcon icon={faAdd} className="mr-3" size="lg" />
                        <span className="text-lg uppercase">Create a Chat</span>
                    </button>
                    <ChatBox />
                    <ChatBox />

                </div>
                <div className="flex flex-col flex-1 w-5/6 max-w-100 pl-10 pr-10">
                    <ChatInterface/>
                    <ChatDialouge/>

                </div>
            </div> 
        </div>

    )
}

export default ChatScreen