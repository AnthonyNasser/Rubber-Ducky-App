import {
    faAdd,
    faArrowUp,
    faCancel,
    faInfo,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useGlobalContext } from '../GlobalContext'

type AddChatFormProps = {
    showFormState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function AddChatButton(props: AddChatFormProps) {
    const globalContext = useGlobalContext()
    const [showForm, setShowForm] = props.showFormState
    const [subject, setSubject] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleCreateChat = async () => {
        setShowForm(false)
        setLoading(true)
        await globalContext.createChat(subject).then(() => {
            setLoading(false)
            setSubject('')
        })
    }

    return (
        <div className="mb-10">
            <button
                onClick={() => setShowForm(!showForm)}
                className={`${
                    showForm ? 'bg-tertiary-300' : 'bg-secondary-800'
                } text-white font-black py-5 mb-1 w-full shadow-lg rounded-lg hover:bg-primary-200 transition duration-500 ease-in-out transform`}
            >
                <div className="flex flex-row align-middle justify-center items-center">
                    <span className="text-lg uppercase ml-3">
                        {showForm ? 'Cancel' : 'Add Chat'}
                    </span>
                    <FontAwesomeIcon
                        icon={showForm ? faCancel : faAdd}
                        className="ml-3"
                        size="lg"
                    />
                </div>
            </button>
            {showForm && (
                <div className="flex justify-center items-center align-middle">
                    <div className="flex flex-col justify-center align-middle items-center w-3/4">
                        <input
                            type="text"
                            placeholder="Enter Subject of Dicussion..."
                            className="bg-secondary-50 w-full mt-5 text-secondary-800 font-black py-5 pl-5 mb-1 rounded-lg"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <div className="flex flex-row self-start items-center">
                            <FontAwesomeIcon
                                icon={faInfoCircle}
                                className="mr-3"
                            />
                            <p className="text-secondary-800 font-black text-sm">
                                This is what you will be talking about with
                                Ducky. Choose any topic that you would like to
                                test yourself on/learn more about.
                            </p>
                        </div>
                        <button
                            onClick={handleCreateChat}
                            className="bg-primary-200 text-white font-black py-5 w-1/4 shadow-lg rounded-lg hover:bg-primary-500 transition duration-500 ease-in-out transform mt-5"
                        >
                            <div className="flex flex-row align-middle justify-center items-center">
                                <span className="text-lg uppercase ml-3">
                                    Create Chat
                                </span>
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className="ml-3"
                                    size="lg"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
