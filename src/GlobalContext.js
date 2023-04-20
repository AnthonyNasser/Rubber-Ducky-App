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

    const value = useMemo(
        () => ({
            currentUser,
            setCurrentUser,
            getAllChats,
            createChat,
            removeChat,
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
