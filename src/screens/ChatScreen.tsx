import { JSXElementConstructor, ReactElement, ReactFragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import ChatBox from '../components/Chatbox'

function ChatScreen() {
    const [chatBoxCount, setChatBoxCount] = useState(2); // Initialize with 2 chatboxes

    const handleAddChatBox = () => {
      setChatBoxCount(chatBoxCount + 1); // Increment the count when the button is clicked
    };
  
    const chatBoxes = [];
    for (let i = 0; i < chatBoxCount; i++) {
      chatBoxes.push(<ChatBox chatTitle={"example" + i} />);
    }

    return (
        <div className={`${BG_STYLE} flex flex-col min-h-screen`}>
            <Navbar />
            <div className="flex flex-row flex-grow">
                <div className="flex flex-col h-full w-1/6" id="chatList">
                    <button 
                    className="bg-secondary-200 text-white font-bold py-5 px-4 rounded-2xl shadow-lg ml-5 mb-5 mt-10"
                    onClick={handleAddChatBox} // Add an onClick handler to the button
                    >
                        <FontAwesomeIcon icon={faAdd} className="mr-3" size="lg" />
                        <span className="text-lg uppercase">Create a Chat</span>
                    </button>
                    <div className="flex flex-col overflow-y-scroll max-h-screen">
                        {chatBoxes}
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-5/6 max-w-100 pl-10 pr-10">
                    <div className="bg-quaternary-300 h-screen rounded-2xl mt-10 mb-10 h-full">
                    </div>
                    <div className="bg-quaternary-300 h-screen rounded-2xl mb-12 h-64">
                    </div>

                </div>
            </div> 
        </div>

    );
};

export default ChatScreen
