import '@/styles/global.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NoPage from './pages/NoPage'
import SignUp from './pages/SingUp'
import ProfilePage from './pages/ProfilePage'

import Admin from './pages/panel/Admin'
import AdminImages from './pages/panel/AdminImages'

import CommunicationPage from './pages/CommunicationPage'

import ChatPanel from './components/ui/communication/ChatPanel'
import SelectChat from './components/ui/communication/skeleton/SelectChat'


function App() {
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/register' element={<SignUp />}/>

                <Route path='/panel/admin' element={<Admin/>}/>
                <Route path='/panel/adminimages' element={<AdminImages/>}/>

                <Route path='/' element={<CommunicationPage/>}>
                    <Route index element={<SelectChat/>} />

                    <Route path='chat'>
                        <Route index element={<SelectChat/>} />
                        <Route path=':id' element={<ChatPanel/>} />
                    </Route>
                </Route>

                <Route path="*" element={<NoPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
