import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import QuizScreen from './screens/QuizScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import { GlobalProvider } from './GlobalContext'
import RequireAuth from './components/RequireAuth'

const App = () => {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnboardingScreen />} index />
                    <Route
                        path="/home"
                        element={
                            <RequireAuth>
                                <HomeScreen />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/chats"
                        element={
                            <RequireAuth>
                                <ChatScreen />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/quiz"
                        element={
                            <RequireAuth>
                                <QuizScreen />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default App
