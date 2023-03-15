import Navbar from '../components/Navbar'

function ChatScreen() {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-primary rounded-lg">
                    <h1 className="text-2xl text-textColor">Chat</h1>
                    <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-secondary rounded-lg">
                        <h1 className="text-2xl text-textColor">Chat</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatScreen
