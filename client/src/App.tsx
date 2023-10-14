import '@/styles/global.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NoPage from './pages/NoPage'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'

import Admin from './pages/panel/Admin'
import AdminImages from './pages/panel/AdminImages'

import CommunicationPage from './pages/CommunicationPage'

import Chat from './components/communication/сomponents/chat/Chat'
import SelectChat from './components/communication/ui/SelectChat'
import ChatPanel from './components/communication/panels/ChatPanel'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/register' element={<Register />}/>

                <Route path='/panel/admin' element={<Admin/>}/>
                <Route path='/panel/adminimages' element={<AdminImages/>}/>

                <Route path='/chat' element={<CommunicationPage/>}>
                    <Route index element={<SelectChat/>} />
                    <Route path=':id' element={<ChatPanel/>} />
                </Route>

                <Route path="*" element={<NoPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
