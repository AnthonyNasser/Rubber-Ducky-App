import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import QuizScreen from './screens/QuizScreen'
import OnboardingScreen from './screens/OnboardingScreen'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OnboardingScreen />} index />
                <Route path="/register" element={<OnboardingScreen />} index />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/chats" element={<ChatScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
