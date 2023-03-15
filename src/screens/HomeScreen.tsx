import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { faBolt, faComment } from '@fortawesome/free-solid-svg-icons'

function HomeScreen() {
    return (
        <div className="bg-quaternary-100">
            <Navbar />
            {/* Welcome */}
            <div className="flex flex-col items-center justify-start h-screen">
                <div className="flex flex-col items-center justify-center w-11/12 h-1/2 rounded-xl bg-gradient-to-r from-secondary-400 to-secondary-100 mt-10">
                    <h1 className="text-4xl font-black text-white">
                        Welcome to Ducky!
                    </h1>
                    <p className="text-white py-5 px-10">
                        Once upon a time, there was a person who was facing a
                        difficult problem. They didn't know what to do, and they
                        felt stuck. One day, they noticed a rubber ducky sitting
                        on the edge of their bathtub. On a whim, they picked up
                        the rubber ducky and started asking it questions, as if
                        it were a wise sage.
                    </p>
                    <p className="text-white py-5 px-10">
                        To their surprise, as they continued to talk to the
                        rubber ducky, they found that the act of verbalizing
                        their thoughts and concerns helped to clarify their
                        thinking. They began to see their problem from a
                        different perspective, and they started to come up with
                        new ideas and solutions.
                    </p>
                    <p className="text-white py-5 px-10">
                        As time went on, the person began to rely on their
                        conversations with the rubber ducky as a way to work
                        through difficult issues. They would hold the rubber
                        ducky in their hand, speak out loud, and listen to the
                        insights that came to them as they talked.
                    </p>
                    <p className="text-white py-5 px-10">
                        Ducky is a tool that helps you to do the same thing, but
                        is much more useful than a rubber ducky. Ducky is a
                        chatbot that will continuously listen to you, ask
                        questions, and/or help you work through your problems.
                    </p>
                </div>
                <div className="flex flex-row items-center justify-evenly w-full rounded-xl mt-5">
                    <Link
                        className="rounded-lg px-3 py-2 flex items-center justify-center text-xs uppercase font-bold w-1/3 text-white bg-gradient-to-r from-secondary-800 to-secondary-600 hover:opacity-75"
                        to="/chats"
                    >
                        <FontAwesomeIcon icon={faComment} size="2x" />
                        <h1 className="text-3xl ml-2">Chat</h1>
                    </Link>
                    <Link
                        className="rounded-lg px-3 py-2 flex items-center justify-center text-xs uppercase font-bold w-1/3 text-white bg-gradient-to-r from-secondary-800 to-secondary-600 hover:opacity-75"
                        to="/quiz"
                    >
                        <FontAwesomeIcon icon={faBolt} size="2x" />
                        <h1 className="text-3xl ml-2">Quiz</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
