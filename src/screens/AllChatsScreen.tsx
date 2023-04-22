import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import ChatBox from '../components/Chatbox'
import AddChatForm from '../components/AddChatForm'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../GlobalContext'
import { ScaleLoader } from 'react-spinners'

function AllChatsScreen() {
    const globalContext = useGlobalContext()
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        globalContext.getAllChats()
    }, [])

    return (
        <div className={`${BG_STYLE} flex flex-col`}>
            <Navbar />
            <div className="flex flex-col h-screen w-full mt-5 px-10 md:px-32">
                <AddChatForm showFormState={[showForm, setShowForm]} />
                {globalContext.currentUser.chats.length > 0 && (
                    <>
                        {globalContext.loading ? (
                            <div className="flex justify-center items-center self-center">
                                <ScaleLoader color="#00416B" />
                            </div>
                        ) : (
                            <>
                                {!showForm && (
                                    <>
                                        {globalContext.currentUser.chats.map(
                                            (chat: any) => (
                                                <div key={chat.id}>
                                                    {chat &&
                                                        chat.id &&
                                                        chat.subject && (
                                                            <div key={chat.id}>
                                                                <ChatBox
                                                                    id={chat.id}
                                                                    subject={
                                                                        chat.subject
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default AllChatsScreen
