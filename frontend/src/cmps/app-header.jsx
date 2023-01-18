import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { BoardIcon, MoreIcon } from '../assets/svg/icon-library'
import { useEffect, useState } from 'react'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const location = useLocation().pathname

    const [isHome, setIsHome] = useState(false)

    useEffect(() => {
        setIsHome(location.includes('home'))
    }, [location])

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className={`${isHome ? 'home-header' : 'app-header'} full`}>

            {!isHome &&
                <div className="header-logo flex align-center ">
                    <BoardIcon />
                    <h1>Trello</h1>
                </div>
            }

            {isHome && <div className="home-header-contianer  ">

                <div className="home-header-logo">
                    <h1>Trello</h1>
                </div>
                <div>
                    <button className='btn-login'>Log in</button>
                    <button className='btn-get-trello'>Get Trello for free</button>

                </div>

                {/* {user &&
    <span className="user-info">
        <Link to={`user/${user._id}`}>
            {user.imgUrl && <img src={user.imgUrl} />}
            {user.fullname}
        </Link>
        <span className="score">{user.score?.toLocaleString()}</span>
        <button onClick={onLogout}>Logout</button>
    </span>
}
{!user &&
    <section className="user-info">
        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
    </section>
} */}
            </div>}

        </header>
    )
}