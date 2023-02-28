import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainLogo } from '../assets/svg/icon-library'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service'
import { logout } from '../store/user/user.actions'

export function HomeHeader() {
    const navigate = useNavigate()
    const [loggdinUser, setLoggdinUser] = useState(userService.getLoggedinUser())

    useEffect(() => {
        setLoggdinUser(userService.getLoggedinUser)
    }, [])

    async function onLogout() {
        try {
            await logout()
            setLoggdinUser('')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className='home-header full'>
            <div className="home-header-contianer  ">
                <div className="home-header-logo flex align-center gap-10">
                    <MainLogo />
                    <h1>Jarvis</h1>
                </div>
                <div>
                    {loggdinUser.fullname !== "Guest"
                        ?
                        <button onClick={onLogout} className='btn-login'>Log Out</button>
                        :
                        <button onClick={() => navigate('/login')} className='btn-login'>Log in</button>
                    }
                    <button onClick={() => navigate('/board')} className='btn-get-trello'>Get Jarvis for free</button>
                </div>
            </div>
        </header>
    )
}