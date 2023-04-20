import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type MessageProps = {
    message: string
    isUser: boolean
}

const ducky = require('../assets/images/DuckyLogo.png')

export default function Message(props: MessageProps) {
    return (
        <>
            {props.isUser ? (
                <div className="flex justify-end mb-4 ml-10">
                    <div className="flex justify-end mb-4 ml-10">
                        <div className="ml-2 bg-primary-400 break-words max-w-full py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white ">
                            {props.message}
                        </div>
                    </div>
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="ml-3 text-white mt-3"
                        size="2xl"
                    />
                </div>
            ) : (
                <div className="flex justify-start mb-4 mr-10">
                    <img src={ducky} alt="profile" className="w-14 h-14" />
                    <div className="flex justify-start mb-4 mr-10">
                        <div className="ml-2 bg-secondary-100 break-words max-w-full py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                            {props.message}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
