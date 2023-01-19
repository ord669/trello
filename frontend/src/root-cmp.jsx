import React from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AppHeader } from './cmps/app-header'
import { UserDetails } from './views/user-details'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BoardDetails } from './views/board-details';
import { TaskDetails } from './views/task-details';
import { HomePage } from './views/home-page';

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <div className='main-container app'>
                    <AppHeader className='full' />
                    <main className='full'>
                        <Routes>
                            <Route path="/" element={<HomePage />} />

                            <Route path="/board/:boardId" element={<BoardDetails />} >
                                <Route Route path="/board/:boardId/:groupId/:taskId" element={<TaskDetails />} />
                            </Route>

                            <Route path="user/:id" element={<UserDetails />} />
                        </Routes>

                    </main>
                </div>
            </Router>
        </Provider>
    )
}
