import React, { JSXElementConstructor, ReactElement, ReactFragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import { faAdd, faUser } from '@fortawesome/free-solid-svg-icons'
import ChatBox from '../components/Chatbox'
import ChatInterface from '../components/ChatInterface'
import ChatDialouge from '../components/ChatDialouge'

type ModalState = {
    showModal: boolean;
    subject: string;
  };

function ChatScreen() {
    const [chatBoxCount, setChatBoxCount] = useState(2); // Initialize with 2 chatboxes
    const [chatBoxes, setChatBoxes] = useState<Array<JSX.Element>>([]);
    const [modalState, setModalState] = useState<ModalState>({
        showModal: false,
        subject: '',
      }); 
      
    const { showModal, subject } = modalState;
    const handleAddChatBox = (e: React.FormEvent) => {
        e.preventDefault(); 
        setChatBoxCount(chatBoxCount + 1); // Increment the count when the button is clicked
      };

    const handleDeleteClick = (index: number) => {
      const newChatBoxes = [...chatBoxes];
      newChatBoxes.splice(index, 1);
      setChatBoxes(newChatBoxes);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem("subjectInput") as HTMLInputElement;
        const chatInputTitle = input.value
        // Do something with the submitted data, e.g. send it to the server
        // Then close the modal

        const nChatBoxes = [...chatBoxes, <ChatBox chatTitle={chatInputTitle} index={chatBoxCount} handleDeleteClick={handleDeleteClick} />];
        setChatBoxes(nChatBoxes);
        setChatBoxCount(chatBoxCount + 1);
        
        setModalState({ ...modalState, showModal: false });
    };
    
    function enterPress(e :React.KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
            console.log("Enter")
            var textArea = document.getElementById("dialouge") as HTMLTextAreaElement | null
            if (textArea != null) {
                textArea.value = ""
                textArea.value = textArea.value.replace( /[\r\n]+/gm, "");
            }
        }
    }
    return (
        <div className={`${BG_STYLE} flex flex-col min-h-screen`}>
            <Navbar />
            <div className="flex flex-row max-h-full h-full">
                <div className="flex flex-col h-full w-1/6" id="chatList">
                    <button 
                    className="bg-secondary-200 text-white font-bold py-5 px-4 rounded-2xl shadow-lg ml-5 mb-5 mt-10"
                    onClick={(e) => {
                        handleAddChatBox(e);
                        setModalState({ ...modalState, showModal: true });
                      }} // Add an onClick handler to the button and also popup
                    
                    >
                        <FontAwesomeIcon icon={faAdd} className="mr-3" size="lg" />
                        <span className="text-lg uppercase">Create a Chat</span>
                    </button>
                    <div className="flex flex-col overflow-y-scroll max-h-screen">
                      {chatBoxes.map((chatBox, index) => (
                        <div key={index}>
                          
                          {chatBox}
                          
                        </div>
                      ))}
                    </div>
                </div>
                <div className="flex flex-col flex-1 w-5/6 max-w-100 pl-10 pr-10">
                    <ChatInterface/>
                    <ChatDialouge/>

                </div>
            </div> 
            {modalState.showModal && (
                <div
                style={{
                    position: 'fixed',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                }}
                >
                <div
                style={{
                    width: '300px',
                    height: '200px',
                    background: 'white',
                    borderRadius: '5px',
                    padding: '20px',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                }}
                >
            <form onSubmit = {handleSubmit}>
              <label htmlFor="subjectInput">What do you want to teach today?:</label>
              <input
                type="text"
                id="subjectInput"
                name="subject"
                value={modalState.subject}
                onChange={(e) => setModalState({ ...modalState, subject: e.target.value })}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
    );
};

export default ChatScreen