import '@/styles/global.css'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/panel/Admin'
import Main from './pages/Main'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />

                    {/* <Route path='me' element={<Me/>}/> */}
                    {/* <Route path='chat/:pubid' element={<Me/>}/> */}
                    <Route path=':routename/:id' element={<Main/>}/>
                    

                </Route>
                <Route path='/panel/admin' element={<Admin/>}/>

                <Route path="*" element={<div>NO PAGE 5474</div>} />
            </Routes>      
        </BrowserRouter>
    )
}
export default App



/* <BrowserRouter>
    <Routes>
        <Route path="/" >
            <Route index element={<Home />} />
            <Route path='me' element={<Me />} />
        </Route>
        <Route path='/panel/admin' element={<Admin/>}/>
    </Routes>      
</BrowserRouter> */


/* <Route path="*" element={<NoPage />} /> */