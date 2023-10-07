import '@/styles/global.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Admin from './pages/panel/Admin'
import Main from './pages/Main'
import Chat from './components/message/Chat'
import SelectChat from './components/panels/ui/SelectChat'
import NoPage from './pages/NoPage'
import Profile from './pages/Profile'
import AdminImages from './pages/panel/AdminImages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main/>} >
                    <Route index element={<SelectChat/>} />

                    <Route path='/chat' >
                        <Route index element={<SelectChat/>} />
                        <Route path=':id' element={<Chat/>} />
                    </Route>
                </Route>
                
                <Route path='/profile' element={<Profile />}/>

                <Route path='/register' element={<Registration />}/>
                <Route path='/panel/admin' element={<Admin/>}/>

                <Route path='/panel/adminimages' element={<AdminImages/>}/>

                <Route path="*" element={<NoPage/>} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
