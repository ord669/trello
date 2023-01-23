import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './login-signup.jsx'
import { ArrowDownIcon, BellIcon, BoardIcon } from '../assets/svg/icon-library'
import { useEffect, useState } from 'react'
import { CreateBoard } from './create-board'
import { BoardNotification } from './board-notifiaction'
import { BoardRecent } from './board-recent'

export function AppHeader() {
    // const user = useSelector(storeState => storeState.userModule.user)
    const location = useLocation().pathname
    const navigate = useNavigate()
    const [isHome, setIsHome] = useState(false)
    const [isRecent, setIsRecent] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const [isCreateBoard, setIsCreateBoard] = useState(false)
    const [isNotification, setIsNotification] = useState(false)

    useEffect(() => {
        if (location.length > 1) setIsHome(false)
        else setIsHome(true)
    }, [location])

    // async function onLogin(credentials) {
    //     try {
    //         const user = await login(credentials)
    //         showSuccessMsg(`Welcome: ${user.fullname}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot login')
    //     }
    // }
    // async function onSignup(credentials) {
    //     try {
    //         const user = await signup(credentials)
    //         showSuccessMsg(`Welcome new user: ${user.fullname}`)
    //     } catch (err) {
    //         showErrorMsg('Cannot signup')
    //     }
    // }
    // async function onLogout() {
    //     try {
    //         await logout()
    //         showSuccessMsg(`Bye now`)
    //     } catch (err) {
    //         showErrorMsg('Cannot logout')
    //     }
    // }

    return (
        <section className={`${isHome ? 'home-header' : 'app-header'} full`}>

            {!isHome &&
                <header className='app-header '>
                    <div className='flex align-center' >
                        <div className='header-logo flex align-center'>
                            <BoardIcon />
                            <span onClick={() => navigate(`/`)}>Trello</span>
                        </div>
                        <div className='flex align-center gap-10' >
                            <div>
                                <button onClick={() => setIsRecent(prev => !prev)} className='btn-app-header' >Recent <ArrowDownIcon /></button>
                                {isRecent && <BoardRecent type={'recent'} />}
                            </div>
                            <div>
                                <button onClick={() => setIsStarred(prev => !prev)} className='btn-app-header'>Starred <ArrowDownIcon /></button>
                                {isStarred && <BoardRecent type={'starred'} />}
                            </div>
                            <div>
                                <button onClick={() => setIsCreateBoard(prev => !prev)} className="btn-bar">Create</button>
                                {isCreateBoard && <CreateBoard setIsCreateBoard={setIsCreateBoard} />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => setIsNotification((prev) => !prev)} className="header-icon"> <BellIcon /></button>
                        {isNotification && <BoardNotification />}
                    </div>

                </header>
            }

            {isHome && <header className='home-header'>

                <div className="home-header-contianer  ">
                    <div className="home-header-logo">
                        <h1>Trello</h1>
                    </div>
                    <div>
                        <button onClick={() => navigate('/login')} className='btn-login'>Log in</button>
                        <button className='btn-get-trello'>Get Trello for free</button>
                    </div>
                </div>
            </header >
            }

        </section >
    )
}