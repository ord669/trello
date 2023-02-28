import { HashRouter as Router, Route, Routes } from "react-router-dom"
import { DynamicHeader } from './cmps/dynamic-header'
import { BoardDetails } from './views/board-details'
import { TaskDetails } from './views/task-details'
import { HomePage } from './views/home-page'
import { BoardIndex } from './views/board-index'
import { UserMsg } from './cmps/user-msg'
import { useState } from "react"
import { MembersModal } from "./cmps/task/task-modals/members/members-modal"
import { Provider } from 'react-redux'
import { store } from './store/store'
import { LoginSignup } from "./cmps/login-signup"

export function App() {
    const [noBg, setnoBg] = useState(false)

    return (
        <Provider store={store}>
            <Router>
                <div className='main-container app'>
                    <DynamicHeader className='full' />
                    <main className='full'>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginSignup />} />
                            <Route path="/board" element={<BoardIndex noBg={noBg} setnoBg={setnoBg} />} />
                            <Route path="/board/:boardId" element={<BoardDetails />} >
                                <Route Route path="/board/:boardId/:groupId/:taskId" element={<TaskDetails noBg={noBg} setnoBg={setnoBg} />} />
                            </Route>
                            <Route path="/board/members" element={<MembersModal />} />
                        </Routes>
                    </main>
                    <UserMsg />
                </div>
            </Router>
        </Provider>
    )
}
