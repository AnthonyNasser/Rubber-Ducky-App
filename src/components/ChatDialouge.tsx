

import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyboardKey } from '@testing-library/user-event'
import { eventNames } from 'process'
import React from 'react'

const ChatDialouge = () => {

    function enterPress(e :React.KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
           
            var textArea = document.getElementById("dialouge") as HTMLTextAreaElement | null;
            if (textArea == null) {
                return;
                
            }
            if (textArea.value === "") {
                return;
            }

            var message = textArea.value;

            textArea.value = "";
            var UI = document.getElementById("interface") as HTMLDivElement | null;
            var bubble = createChatBubble(message)
            UI?.appendChild(bubble);
            bubble.scrollIntoView();
            
        }
       
    }

    function createChatBubble(text: string) {
        var bubble = document.createElement("div");
        var innerBubble = document.createElement("div");
        bubble.appendChild(innerBubble);
        bubble.classList.value = "flex justify-end mb-4 ml-10";
        innerBubble.classList.value = "ml-2 bg-secondary-200 break-words max-w-full py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white";
        innerBubble.innerText = text;
        return bubble;

    }
    return (
        <div className="flex bg-[#93bddf] max-h-[125px] rounded-2xl mb-12 h-64 shadow-lg border-2 border-[#5295cc]">
            <textarea className="bg-[transparent] break-words appearance-none border-red-500 rounded w-full h-full text-gray-700 mb-3 leading-tight px-5 py-5 focus:outline-0"
            onKeyDown={enterPress}
            id="dialouge">
            </textarea>
        </div>
    )


}

export default ChatDialouge