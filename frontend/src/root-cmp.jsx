import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { AppHeader } from './cmps/app-header'
import { UserDetails } from './views/user-details'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BoardDetails } from './views/board-details'
import { TaskDetails } from './views/task-details'
import { HomePage } from './views/home-page'
import { BoardIndex } from './views/board-index'
import { UserMsg } from './cmps/user-msg'
import { modalReducer } from './store/modal/modal.reducer'
import { updatePos } from './store/modal/modal.action'

export function App() {
    useEffect(() => {
        const handleMouseMove = (event) => {
            const pos = { x: event.x, y: event.y }
            updatePos(pos)
        };
        window.addEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <div className='main-container app'>
                    <AppHeader className='full' />
                    <main className='full'>

                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/board" element={<BoardIndex />} />

                            <Route path="/board/:boardId" element={<BoardDetails />} >
                                <Route Route path="/board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                            </Route>

                            <Route path="user/:id" element={<UserDetails />} />
                        </Routes>

                    </main>
                    <UserMsg />
                </div>
            </Router>
        </Provider>
    )
}
