import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import {
    faBars,
    faHome,
    faComment,
    faBolt,
} from '@fortawesome/free-solid-svg-icons'

const duckyLogo = require('../assets/images/DuckyLogo.png')

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-tertiary-100 mb-2">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-white hover:opacity-75"
                            to="/"
                        >
                            <img
                                src={duckyLogo}
                                alt="logo"
                                className="w-8 h-8 mr-2"
                            />
                            Ducky AI
                        </Link>

                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/"
                                >
                                    <FontAwesomeIcon icon={faHome} />
                                    <span className="ml-2">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/chats"
                                >
                                    <FontAwesomeIcon icon={faComment} />
                                    <span className="ml-2">Chat</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    to="/quiz"
                                >
                                    <FontAwesomeIcon icon={faBolt} />
                                    <span className="ml-2">Quiz</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
