import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import ChatBox from '../components/Chatbox'
import AddChatForm from '../components/AddChatForm'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../GlobalContext'
import { doc, getDoc } from 'firebase/firestore'
import { fbFS } from '../services/firebase'
import { RiseLoader } from 'react-spinners'

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
                {globalContext.loading ? (
                    <div className="flex justify-center items-center self-center">
                        <RiseLoader color="#FF2200" size={25} />
                    </div>
                ) : (
                    <>
                        {!showForm && (
                            <>
                                {globalContext.currentUser.chats.map(
                                    (chat: any) => (
                                        <>
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
                                        </>
                                    )
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
