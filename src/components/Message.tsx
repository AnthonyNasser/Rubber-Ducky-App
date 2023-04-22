import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type MessageProps = {
    message: string
    isUser: boolean
}

const ducky = require('../assets/images/duck-png-10.png')
const user = require('../assets/images/user-icon.png')

export default function Message(props: MessageProps) {
    return (
        <>
            {props.isUser ? (
                <div className="flex justify-end ml-10 my-5 items-center">
                    <div className="flex justify-end mb-1 ml-10 w-full md:w-1/2">
                        <div className="mr-2 bg-secondary-100 break-words max-w-full py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white text-sm md:text-lg">
                            {props.message}
                        </div>
                    </div>
                    <img
                        src={user}
                        alt="profile"
                        className="w-14 h-14 rounded-2xl mb-1"
                    />
                </div>
            ) : (
                <div className="flex justify-start mr-10">
                    <img
                        src={ducky}
                        alt="profile"
                        className="w-14 h-14 rounded-2xl mb-1"
                    />
                    <div className="flex justify-start mb-1 mr-10 w-full md:w-1/2">
                        <div className="ml-2 bg-secondary-800 break-words max-w-full py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white text-sm text-sm md:text-lg">
                            {props.message}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
