import '@/styles/global.css'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Me from './pages/Me'
import Admin from './pages/panel/Admin'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route index element={<Home />} />
                    <Route path='me' element={<Me />} />
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
                <Route path='/panel/admin' element={<Admin/>}/>
            </Routes>      
        </BrowserRouter>
    )
}
export default App


{/* <Router>
                <Header />
                <Switch>
                <Route exact path="/" component={Home} />
                <Route exace path="/about-me" component={AboutMe} />
                <Route exact path="/portfolio" component={Portfolio} />
                <Route exact path="/socials" component={Socials} />
                <Redirect to="/" />
                </Switch>
            </Router> */}



            // return (
            //     <BrowserRouter>
            //         <Routes>
            //             <Route path="/" element={<Layout />}>
            //                 <Route index element={<Home />} />
            //                 <Route path="blogs" element={<Blogs />} />
            //                 {/* <Route path="contact" element={<Contact />} /> */}
            //                 {/* <Route path="*" element={<NoPage />} /> */}
            //             </Route>
            //         </Routes>      
            //     </BrowserRouter>
            // )