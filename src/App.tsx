import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import QuizScreen from './screens/QuizScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/chats" element={<ChatScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
