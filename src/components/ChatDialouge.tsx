

import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { keyboardKey } from '@testing-library/user-event'
import { eventNames } from 'process'
import React from 'react'

const ChatDialouge = () => {

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
        <div className="flex bg-[#93bddf] rounded-2xl mb-12 h-64 shadow-lg border-2 border-[#5295cc]">
            <textarea className="bg-[transparent] break-all appearance-none border-red-500 rounded w-full h-full text-gray-700 mb-3 leading-tight px-5 py-5 focus:outline-0"
            onKeyDown={enterPress}
            id="dialouge">

            </textarea>
    
        </div>
    )
}

export default ChatDialouge