import { useState } from 'react'
import { BG_STYLE, FADE_IN_SHORT } from '../theme/tailwind-styles'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { fbAuth, fbFS } from '../services/firebase'
import { useGlobalContext } from '../GlobalContext'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import PacmanLoader from 'react-spinners/PacmanLoader'

const auth = fbAuth

function OnboardingScreen() {
    const [isRegistering, setIsRegistering] = useState(true)

    const BIG_CONTAINER_STYLE: string = `flex flex-col items-center justify-start px-10 ${FADE_IN_SHORT}`

    return (
        <div className={`${BG_STYLE} h-screen w-screen`}>
            <div className="py-20" />
            <div
                className={` bg-secondary-200 px-10 mx-12 flex flex-col items-center justify-center rounded-3xl shadow-xl ${FADE_IN_SHORT}`}
            >
                <div
                    className={`${BIG_CONTAINER_STYLE} py-10 my-5 w-full md:w-3/4 lg:w-1/2`}
                >
                    <h1 className="text-3xl md:text-4xl pb-10 font-black text-white">
                        Welcome to Ducky!
                    </h1>
                    {isRegistering ? (
                        <RegisterForm
                            isRegisteringState={[
                                isRegistering,
                                setIsRegistering,
                            ]}
                        />
                    ) : (
                        <LoginForm
                            isRegisteringState={[
                                isRegistering,
                                setIsRegistering,
                            ]}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const RegisterForm = (props: any) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/home'
    const [loading, setLoading] = useState(false)

    const [isRegistering, setIsRegistering] = props.isRegisteringState

    const globalContext = useGlobalContext()

    const createUser = (e: any) => {
        e.preventDefault()

        setLoading(true)

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }

        // set timeout so seeing pacman is mandatory lol
        setTimeout(() => {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user
                    const id = user?.uid
                    const userRef = doc(fbFS, 'users', id)
                    await setDoc(userRef, {
                        firstName,
                        lastName,
                        email,
                        createdAt: new Date(),
                    }).then(() => {
                        globalContext?.setCurrentUser({
                            firstName,
                            lastName,
                            email,
                            createdAt: new Date(),
                        })
                        navigate(from, { replace: true })
                    })
                })
                .catch((error) => {
                    const errorMessage = error.message
                    setError(errorMessage)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 1000)
    }

    return (
        <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={createUser}
        >
            <input
                type="text"
                placeholder="First Name"
                className="bg-white rounded-lg px-5 py-2 mb-5 w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                className="bg-white rounded-lg px-5 py-2 mb-5 w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                className="bg-white rounded-lg px-5 py-2 mb-5 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className={`${
                    error == 'Passwords do not match'
                        ? 'bg-primary-800'
                        : 'bg-white'
                } rounded-lg px-5 py-2 mb-5 w-full`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className={`${
                    error == 'Passwords do not match'
                        ? 'bg-primary-800'
                        : 'bg-white'
                }  rounded-lg px-5 py-2 mb-5 w-full`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {error && (
                <p className="text-lg px-20 text-tertiary-800 bg-quaternary-100 rounded-xl">
                    Error: {error}
                </p>
            )}

            {loading ? (
                <PacmanLoader color={'#ffffff'} loading={loading} size={30} />
            ) : (
                <button
                    type="submit"
                    className="bg-primary-300 rounded-lg px-5 py-2 mb-5 mt-6 w-full text-white text-lg font-black"
                >
                    Sign Up
                </button>
            )}
            <button
                className="text-lg text-white underline"
                onClick={() => setIsRegistering(false)}
            >
                Already have an account?
            </button>
        </form>
    )
}

const LoginForm = (props: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [isRegistering, setIsRegistering] = props.isRegisteringState

    const [loading, setLoading] = useState(false)
    const globalContext = useGlobalContext()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/home'

    const loginUser = (e: any) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user
                    const id = user?.uid
                    const userRef = doc(fbFS, 'users', id)
                    await getDoc(userRef)
                        .then((doc) => {
                            if (doc.exists()) {
                                globalContext?.setCurrentUser(doc.data())
                                navigate(from, { replace: true })
                            } else {
                                console.error('No such document!')
                            }
                        })
                        .catch((error) => {
                            console.error('Error getting document:', error)
                        })
                })
                .catch((error) => {
                    const errorMessage = error.message
                    setError(errorMessage)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, 1000)
    }

    return (
        <form
            className="flex flex-col items-center justify-center w-full"
            onSubmit={loginUser}
        >
            <input
                type="email"
                placeholder="Email"
                className="bg-white rounded-lg px-5 py-2 mb-5 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="bg-white rounded-lg px-5 py-2 mb-5 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && (
                <p className="text-lg px-20 text-tertiary-800 bg-quaternary-100 rounded-xl">
                    Error: {error}
                </p>
            )}
            {loading ? (
                <PacmanLoader color="#FFFFFF" />
            ) : (
                <button
                    type="submit"
                    className="bg-primary-300 rounded-lg px-5 py-2 mb-5 mt-6 w-full text-white text-lg font-black"
                >
                    Log In
                </button>
            )}
            <button
                className="text-lg text-white underline"
                onClick={() => setIsRegistering(true)}
            >
                Don't have an account?
            </button>
        </form>
    )
}

export default OnboardingScreen
