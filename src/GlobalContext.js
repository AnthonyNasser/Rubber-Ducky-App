import React, { useContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { fbAuth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const GlobalContext = React.createContext()

export function useGlobalContext() {
    return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(fbAuth, (userAuth) => {
            if (userAuth) {
                const userData = {
                    uid: userAuth.uid,
                    email: userAuth.email,
                }
                setCurrentUser(userData)
            } else {
                setCurrentUser(null)
            }
        })
    }, [])

    const value = useMemo(
        () => ({
            currentUser,
            setCurrentUser,
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
