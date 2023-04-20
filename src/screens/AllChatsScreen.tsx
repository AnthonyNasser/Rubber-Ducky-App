import Navbar from '../components/Navbar'
import { BG_STYLE } from '../theme/tailwind-styles'
import ChatBox from '../components/Chatbox'
import AddChatButton from '../components/AddChatButton'
import { useEffect } from 'react'
import { useGlobalContext } from '../GlobalContext'
import { doc, getDoc } from 'firebase/firestore'
import { fbFS } from '../services/firebase'

function AllChatsScreen() {
    const globalContext = useGlobalContext()

    useEffect(() => {
        globalContext.getAllChats()
    }, [])

    return (
        <div className={`${BG_STYLE} flex flex-col`}>
            <Navbar />
            <div className="flex flex-col h-screen w-full mt-5 px-10 md:px-32">
                <AddChatButton />
                {globalContext.currentUser.chats.map((chat: any) => (
                    <>
                        {chat && chat.id && chat.subject && (
                            <div key={chat.id}>
                                <ChatBox id={chat.id} subject={chat.subject} />
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}

export default AllChatsScreen
