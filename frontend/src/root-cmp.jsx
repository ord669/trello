import React from 'react'
import { HashRouter as Router, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { CarIndex } from './pages/car-index.jsx'
import { ReviewIndex } from './pages/review-index.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { HomeHeader } from './cmps/home-header';

export function App() {
    const location = window.location.href
    const regex = new RegExp('home', 'i')
    const isHome = regex.test(location)


    return (
        <Provider store={store}>
            <Router>
                <div className='main-container app'>

                    {!isHome
                        ? <AppHeader className='full' />
                        : <HomeHeader className='full' />
                    }
                    <main className='full'>
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="car" element={<CarIndex />} />
                            <Route path="review" element={<ReviewIndex />} />
                            <Route path="chat" element={<ChatApp />} />
                            <Route path="about" element={<AboutUs />} />
                            <Route path="admin" element={<AdminApp />} />
                            <Route path="user/:id" element={<UserDetails />} />
                        </Routes>
                        {/* <BoardDetails /> */}
                    </main>
                </div>
            </Router>
        </Provider>
    )
}
