import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './views/chat.js'
import SignIn from './views/sign_in.js'
import SignUp from './views/sign_up.js'




function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:id" element = {<Chat/>} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRouter