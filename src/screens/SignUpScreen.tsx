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
const quackSrc = require('../assets/sounds/quack.mp3')

function quack() {
    var quackSound = new Audio(quackSrc)
    quackSound.volume = 0.5
    quackSound.play()
}

function SignUpScreen() {
    const BIG_CONTAINER_STYLE: string = `flex flex-col items-center justify-start px-10 ${FADE_IN_SHORT}`
    const PARAGRAPHS_CONTAINER_STYLE: string =
        'flex flex-col items-center justify-center w-auto h-5/6 shadow-xlg rounded-3xl bg-secondary-100 mt-10 shadow-md'

    return (
        <div className={`${BG_STYLE}`}>
            <Navbar />
            <div className={BIG_CONTAINER_STYLE}>
                <div className={PARAGRAPHS_CONTAINER_STYLE}>
                    <h1 className="text-3xl md:text-6xl my-8 lg:my-12 font-black text-white ">
                        SignUp!
                    </h1>
                    <div>
                        <form className="flex items-center justify-center">
                            {/* <label htmlFor="subjectInput" className="px-3 py-2 text-white font-bold flex items-center justify-center">Username</label> */}
                            <input
                                className="hover:transform hover:-translate-y-1 hover:-skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-1/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                                type="text"
                                id="subjectInput"
                                name="subject"
                                placeholder="Username"
                                //value={modalState.subject}
                                //onChange={(e) => setModalState({ ...modalState, subject: e.target.value })}
                                style={{
                                    width: '100%',
                                    height: '20%',
                                }}
                            />
                        </form>
                        <br></br>

                        <form className="flex items-center justify-center">
                            {/* <label htmlFor="subjectInput" className="px-3 py-2 text-white font-bold flex items-center justify-center">Username</label> */}
                            <input
                                className="hover:transform hover:-translate-y-1 hover:-skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-1/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                                type="text"
                                id="subjectInput"
                                name="subject"
                                placeholder="Email"
                                //value={modalState.subject}
                                //onChange={(e) => setModalState({ ...modalState, subject: e.target.value })}
                                style={{
                                    width: '100%',
                                    height: '20%',
                                }}
                            />
                        </form>
                        <br></br>
                        <form className="flex items-center justify-center">
                            {/* <label htmlFor="subjectInput" className="px-3 py-2 text-white font-bold flex items-center justify-center">Username</label> */}
                            <input
                                className="hover:transform hover:-translate-y-1 hover:-skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-1/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                                type="text"
                                id="subjectInput"
                                name="subject"
                                placeholder="Password"
                                //value={modalState.subject}
                                //onChange={(e) => setModalState({ ...modalState, subject: e.target.value })}
                                style={{
                                    width: '100%',
                                    height: '20%',
                                }}
                            />
                        </form>
                        <br></br>
                        <form className="flex items-center justify-center">
                            {/* <label htmlFor="subjectInput" className="px-3 py-2 text-white font-bold flex items-center justify-center">Username</label> */}
                            <input
                                className="hover:transform hover:-translate-y-1 hover:-skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-2/3 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                                type="text"
                                id="subjectInput"
                                name="subject"
                                placeholder="Re-Enter Password"
                                //value={modalState.subject}
                                //onChange={(e) => setModalState({ ...modalState, subject: e.target.value })}
                                style={{
                                    width: '100%',
                                    height: '20%',
                                }}
                            />
                        </form>
                        <br></br>
                    </div>
                    <div
                        className={`flex items-center justify-center sm:justify-between w-full rounded-xl px-10 pb-5 ${FADE_IN_LONG}`}
                    >
                        <Link
                            className="hover:transform hover:-translate-y-1 hover:skew-y-1 hover:bg-primary-500 hover:opacity-100 transition duration-300 ease-in-out rounded-2xl px-3 py-5 mt-6 mb-2 lg:my-0 flex items-center justify-center text-xs uppercase font-bold w-full lg:w-2/2 text-white bg-gradient-to-r bg-primary-300 shadow-lg"
                            to="/login"
                        >
                            <FontAwesomeIcon icon={faComment} size="2x" />
                            <h1 className="text-lg ml-2">SignUp</h1>
                        </Link>
                        {/* <img
                            className="hidden lg:block w-1/6"
                            src={rubberDuckyTransparent}
                            alt="Rubber Ducky"
                            onClick={quack}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpScreen
