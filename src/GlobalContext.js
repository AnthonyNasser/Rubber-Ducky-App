import React, { useContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { fbAuth, fbFS } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
import {
    askInitialQuestionCompletion,
    askQuestionCompletion,
    verifyQuestionCompletion,
} from './services/open-ai'

const GlobalContext = React.createContext()

export function useGlobalContext() {
    return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // onAuthStateChanged(fbAuth, (userAuth) => {
        //     if (userAuth) {
        //         const userData = {
        //             ...currentUser,
        //             uid: userAuth.uid,
        //             email: userAuth.email,
        //             chats: [],
        //         }
        //         setCurrentUser(userData)
        //         getAllChats()
        //     } else {
        //         setCurrentUser(null)
        //     }
        // })
    }, [])

    const getAllChats = async () => {
        setCurrentUser((prev) => ({
            ...prev,
            chats: [],
        }))
        const userRef = doc(fbFS, 'users', currentUser.uid)
        setLoading(true)
        await getDoc(userRef).then((doc) => {
            if (doc.exists()) {
                const chats = doc.data().chats
                chats.forEach(async (chat) => {
                    await getDoc(chat).then((doc) => {
                        if (doc.exists()) {
                            const chatData = {
                                id: doc.id,
                                subject: doc.data().subject,
                                messages: doc.data().messages,
                            }
                            if (chatData.subject != '') {
                                setCurrentUser((prev) => ({
                                    ...prev,
                                    chats: [...prev.chats, chatData],
                                }))
                            }
                        }
                    })
                })
            } else {
                console.log('No such document!')
            }
        })
        setLoading(false)
    }

    const createChat = async (subject) => {
        const chatsCollection = collection(fbFS, 'chats')
        setLoading(true)
        await addDoc(chatsCollection, {
            subject: subject,
            messages: [],
        }).then(async (docRef) => {
            const chatRef = doc(fbFS, 'chats', docRef.id)
            const userRef = doc(fbFS, 'users', currentUser.uid)
            await updateDoc(userRef, {
                chats: arrayUnion(chatRef),
            })
            currentUser.chats.push({
                id: docRef.id,
                subject: subject,
                messages: [],
            })

            // add first question
            await askInitialQuestionCompletion(subject).then(
                async (response) => {
                    await updateDoc(chatRef, {
                        messages: arrayUnion({
                            isUser: false,
                            message: response,
                        }),
                    })
                    currentUser.chats.forEach((chat) => {
                        if (chat.id == docRef.id) {
                            chat.messages.push({
                                isUser: false,
                                message: response,
                            })
                        }
                    })
                }
            )
        })
        setLoading(false)
        getAllChats()
    }

    const removeChat = async (chatId) => {
        const chatRef = doc(fbFS, 'chats', chatId)
        await deleteDoc(chatRef)
        const userRef = doc(fbFS, 'users', currentUser.uid)
        await updateDoc(userRef, {
            chats: arrayRemove(chatRef),
        })
        getAllChats()
    }

    const changeSubject = async (chatId, subject) => {
        const chatRef = doc(fbFS, 'chats', chatId)
        await updateDoc(chatRef, {
            subject: subject,
        })
        currentUser.chats.forEach((chat) => {
            if (chat.id == chatId) {
                chat.subject = subject
            }
        })
        getAllChats()
    }

    const addMessage = async (
        chatId,
        subject,
        question,
        message,
        previousQuestions
    ) => {
        const chatRef = doc(fbFS, 'chats', chatId)
        await updateDoc(chatRef, {
            messages: arrayUnion({
                isUser: true,
                message: message.message,
            }),
        })
        currentUser.chats.forEach((chat) => {
            if (chat.id == chatId) {
                chat.messages.push(message)
            }
        })
        await verifyQuestionCompletion(subject, question, message.message).then(
            async (response) => {
                if (response.includes('++Yes++')) {
                    await updateDoc(chatRef, {
                        messages: arrayUnion({
                            isUser: false,
                            message: "That's correct!",
                        }),
                    })
                    currentUser.chats.forEach((chat) => {
                        if (chat.id == chatId) {
                            chat.messages.push({
                                isUser: false,
                                message: "That's correct!",
                            })
                        }
                    })
                    await askQuestionCompletion(
                        subject,
                        message.message,
                        previousQuestions
                    ).then(async (response) => {
                        await updateDoc(chatRef, {
                            messages: arrayUnion({
                                isUser: false,
                                message: response,
                            }),
                        })
                        currentUser.chats.forEach((chat) => {
                            if (chat.id == chatId) {
                                chat.messages.push({
                                    isUser: false,
                                    message: response,
                                })
                            }
                        })
                    })
                } else {
                    console.log('INCORRECTO BONDITO: ' + response)
                    await updateDoc(chatRef, {
                        messages: arrayUnion({
                            isUser: false,
                            message: response,
                        }),
                    }).then(async () => {
                        currentUser.chats.forEach((chat) => {
                            if (chat.id == chatId) {
                                chat.messages.push({
                                    isUser: false,
                                    message: response,
                                })
                            }
                        })
                        const sentenceStarters = [
                            'Please try again. ',
                            "Let's try again. ",
                            "Let's try that again. ",
                            "Let's try that one more time. ",
                            'Give it another try. ',
                        ]
                        await updateDoc(chatRef, {
                            messages: arrayUnion({
                                isUser: false,
                                message: question,
                            }),
                        }).then(async () => {
                            const newQuestion = `${
                                sentenceStarters[
                                    Math.floor(
                                        Math.random() * sentenceStarters.length
                                    )
                                ]
                            } ${question}`

                            let questionToSave = ''

                            if (
                                question.includes("Let's try again. ") ||
                                question.includes("Let's try that again. ") ||
                                question.includes(
                                    "Let's try that one more time. "
                                ) ||
                                question.includes('Give it another try. ')
                            ) {
                                questionToSave = question
                            } else {
                                questionToSave = newQuestion
                            }

                            currentUser.chats.forEach((chat) => {
                                if (chat.id == chatId) {
                                    chat.messages.push({
                                        isUser: false,
                                        message: questionToSave,
                                    })
                                }
                            })

                            await updateDoc(chatRef, {
                                messages: arrayUnion({
                                    isUser: false,
                                    message: questionToSave,
                                }),
                            })
                        })
                    })
                }
            }
        )
    }

    const value = useMemo(
        () => ({
            currentUser,
            setCurrentUser,
            getAllChats,
            createChat,
            removeChat,
            addMessage,
            changeSubject,
            loading,
            setLoading,
        }),
        [currentUser, setCurrentUser]
    )
    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
