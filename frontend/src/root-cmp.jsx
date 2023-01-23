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
import { utilService } from "./services/util.service"
import { MembersModal } from "./cmps/task/task-modals/members-modal"

export function App() {
    const { dynamicModalStatus } = useSelector(storeState => storeState.modalModule)
    // const { modalPos } = useSelector(storeState => storeState.modalModule)

    // useEffect(() => {
    //     window.addEventListener('click', (event) => {
    //         console.log('modalPos:', modalPos)
    //         console.log('utilService.clickedOnModal({ x: event.x, y: event.y }, { borderLeft: modalPos.left, borderRight: modalPos.right, borderTop: modalPos.top, borderBottom: modalPos.bottom }): ', utilService.clickedOnModal({ x: event.x, y: event.y }, { borderLeft: modalPos.left, borderRight: modalPos.right, borderTop: modalPos.top, borderBottom: modalPos.bottom }));
    //         if (utilService.clickedOnModal({ x: event.x, y: event.y }, { borderLeft: modalPos.left, borderRight: modalPos.right, borderTop: modalPos.top, borderBottom: modalPos.bottom })) return
    //         closeDynamicModal()
    //     })

    // }, [modalPos])

    return (
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
                        <Route path="/board/members" element={<MembersModal />} />
                    </Routes>
                    {dynamicModalStatus && <DynamicModal />}
                </main>
                <UserMsg />
            </div>
        </Router>
    )
}
