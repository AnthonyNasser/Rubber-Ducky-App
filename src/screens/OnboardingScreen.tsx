import { useState } from 'react'
import { BG_STYLE, FADE_IN_SHORT } from '../theme/tailwind-styles'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { fbAuth } from '../services/firebase'
import { useGlobalContext } from '../GlobalContext'

const auth = fbAuth
function OnboardingScreen() {
    const globalContext = useGlobalContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const createUser = (e: any) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user
                const id = user?.uid
                // const userRef = fbFS.collection('users').doc(id)
                // await userRef.set({
                //     firstName,
                //     lastName,
                //     email,
                //     createdAt: new Date(),
                // })
                globalContext?.setUser({
                    firstName,
                    lastName,
                    email,
                    createdAt: new Date(),
                })
            })
            .catch((error) => {
                const errorMessage = error.message
                setError(errorMessage)
            })
    }

    // const loginUser = (e: any) => {
    //     e.preventDefault()
    //     console.log('logging in user')
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user
    //             console.log(user)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code
    //             const errorMessage = error.message
    //             console.error(errorCode, errorMessage)
    //         })
    // }

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
                        <button
                            type="submit"
                            className="bg-primary-300 rounded-lg px-5 py-2 mb-5 mt-6 w-full text-white text-lg font-black"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OnboardingScreen
