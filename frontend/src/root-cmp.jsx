// import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { AppHeader } from './cmps/app-header'
import { UserDetails } from './views/user-details'
import { BoardDetails } from './views/board-details'
import { TaskDetails } from './views/task-details'
import { HomePage } from './views/home-page'
import { BoardIndex } from './views/board-index'
import { UserMsg } from './cmps/user-msg'
import { DynamicModal } from "./cmps/dynamic-modal"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { closeDynamicModal, updateDynamicModalPos } from "./store/modal/modal.action"
import { MembersModal } from "./cmps/task/task-modals/members/members-modal"
import { Provider } from 'react-redux'
import { store } from './store/store'
import { LoginSignup } from "./cmps/login-signup"

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <div className='main-container app'>
                    <AppHeader className='full' />
                    <main className='full'>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginSignup />} />
                            <Route path="/board" element={<BoardIndex />} />
                            <Route path="/board/:boardId" element={<BoardDetails />} >
                                <Route Route path="/board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                            </Route>
                            <Route path="user/:id" element={<UserDetails />} />
                            <Route path="/board/members" element={<MembersModal />} />
                        </Routes>
                    </main>
                    <UserMsg />
                </div>
            </Router>
        </Provider>
    )
}
