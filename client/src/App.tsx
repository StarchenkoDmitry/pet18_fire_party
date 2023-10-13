import '@/styles/global.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Admin from './pages/panel/Admin'
import CommunicationPage from './pages/CommunicationPage'
import Chat from './components/communication/сomponents/chat/Chat'
import SelectChat from './components/communication/ui/SelectChat'
import NoPage from './pages/NoPage'
import ProfilePage from './pages/ProfilePage'
import AdminImages from './pages/panel/AdminImages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CommunicationPage/>} >
                    <Route index element={<SelectChat/>} />

                    <Route path='/chat' >
                        <Route index element={<SelectChat/>} />
                        <Route path=':id' element={<Chat/>} />
                    </Route>
                </Route>
                
                <Route path='/profile' element={<ProfilePage/>}/>

                <Route path='/register' element={<Register />}/>
                <Route path='/panel/admin' element={<Admin/>}/>

                <Route path='/panel/adminimages' element={<AdminImages/>}/>

                <Route path="*" element={<NoPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
