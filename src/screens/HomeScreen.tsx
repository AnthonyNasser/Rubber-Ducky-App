import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { faBolt, faComment } from '@fortawesome/free-solid-svg-icons'
import {
    BG_STYLE,
    FADE_IN_SHORT,
    FADE_IN_LONG,
    PARAGRAPH_STYLE,
} from '../theme/tailwind-styles'

const rubberDuckyTransparent = require('../assets/images/rubber-ducky-transparent.png')

function HomeScreen() {
    const BIG_CONTAINER_STYLE: string = `flex flex-col items-center justify-start px-10 ${FADE_IN_SHORT}`
    const PARAGRAPHS_CONTAINER_STYLE: string =
        'flex flex-col items-center justify-center w-auto h-5/6 shadow-xlg rounded-3xl bg-secondary-100 mt-10 shadow-md'
    return (
        <div className={`${BG_STYLE} h-full pb-10`}>
            <Navbar />
            <div className={BIG_CONTAINER_STYLE}>
                <div className={PARAGRAPHS_CONTAINER_STYLE}>
                    <h1 className="text-3xl md:text-6xl my-8 lg:my-12 font-black text-white">
                        Welcome to Ducky!
                    </h1>
                    <p className={PARAGRAPH_STYLE}>
                        Once upon a time, there was a person who was facing a
                        difficult problem. They didn't know what to do, and they
                        felt stuck. One day, they noticed a rubber ducky sitting
                        on the edge of their bathtub. On a whim, they picked up
                        the rubber ducky and started asking it questions, as if
                        it were a wise sage.
                    </p>
                    <p className={PARAGRAPH_STYLE}>
                        To their surprise, as they continued to talk to the
                        rubber ducky, they found that the act of verbalizing
                        their thoughts and concerns helped to clarify their
                        thinking. They began to see their problem from a
                        different perspective, and they started to come up with
                        new ideas and solutions.
                    </p>
                    <p className={PARAGRAPH_STYLE}>
                        As time went on, the person began to rely on their
                        conversations with the rubber ducky as a way to work
                        through difficult issues. They would hold the rubber
                        ducky in their hand, speak out loud, and listen to the
                        insights that came to them as they talked. Ducky is a
                        tool that helps you to do the same thing, but is much
                        more useful than a rubber ducky. Ducky is a chatbot that
                        will continuously listen to you, ask questions, and/or
                        help you work through your problems.
                    </p>
                    <div
                        className={`flex flex-col sm:flex-row sm:flex-wrap items-center sm:justify-between w-full rounded-xl px-10 pb-5 ${FADE_IN_LONG}`}
                    >
                        <Link
                            className="hover:transform hover:-translate-y-1 hover:skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-1/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                            to="/chats"
                        >
                            <FontAwesomeIcon icon={faComment} size="2x" />
                            <h1 className="text-lg ml-2">Chat With Ducky</h1>
                        </Link>
                        <img
                            className="hidden lg:block w-1/6"
                            src={rubberDuckyTransparent}
                            alt="Rubber Ducky"
                        />
                        <Link
                        // diabled button
                            className="opacity-50 cursor-not-allowed transition rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-1/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                            to="#"
                        >
                            <FontAwesomeIcon icon={faBolt} size="2x" />
                            <h1 className="text-lg ml-2 disabled">Quiz With Ducky (TBD)</h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
