import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import {
    faBars,
    faHome,
    faComment,
    faBolt,
} from '@fortawesome/free-solid-svg-icons'
const duckyLogo = require('../assets/images/DuckyLogo.png')

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = React.useState(false)

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-tertiary mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-textColor hover:opacity-75"
                            href="/"
                        >
                            <img
                                src={duckyLogo}
                                alt="logo"
                                className="w-8 h-8 mr-2"
                            />
                            Ducky AI
                        </a>

                        <button
                            className="text-textColor cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                    <div
                        className={
                            'lg:flex flex-grow items-center' +
                            (navbarOpen ? ' flex' : ' hidden')
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textColor hover:opacity-75"
                                    href="#pablo"
                                >
                                    <FontAwesomeIcon icon={faHome} />
                                    <span className="ml-2">Home</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textColor hover:opacity-75"
                                    href="#pablo"
                                >
                                    <FontAwesomeIcon icon={faComment} />
                                    <span className="ml-2">Chat</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-textColor hover:opacity-75"
                                    href="#pablo"
                                >
                                    <FontAwesomeIcon icon={faBolt} />
                                    <span className="ml-2">Quiz</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
