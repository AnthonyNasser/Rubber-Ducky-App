import React, { useContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { fbAuth, fbFS } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const GlobalContext = React.createContext()

export function useGlobalContext() {
    return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

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
    }

    const value = useMemo(
        () => ({
            currentUser,
            setCurrentUser,
            getAllChats,
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
