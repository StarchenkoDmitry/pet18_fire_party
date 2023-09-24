import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import '@/styles/global.css'

import Home from './pages/Home'
import { Route, Router, Routes } from 'react-router-dom'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element= {<Home/>} />
                {/* <Route path="/about-me" element= {<AboutMe/>} />
                <Route path="/portfolio" element= {<Portfolio/>} />
                <Route path="/socials" element= {<Socials/>} /> */}
            </Routes>            
        </>
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