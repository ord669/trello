import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainLogo } from '../assets/svg/icon-library'


export function HomeHeader() {
    const navigate = useNavigate()
    const [isOpenNav, setIsOpenNav] = useState(false)

    return (
        <header className='home-header full'>

            <div className="home-header-contianer  ">
                <div className="home-header-logo flex align-center gap-10">
                    <MainLogo />
                    <h1>Jarvis</h1>
                </div>
                <div>
                    <button onClick={() => navigate('/login')} className='btn-login'>Log in</button>
                    <button onClick={() => navigate('/board')} className='btn-get-trello'>Get Trello for free</button>
                </div>
            </div>
        </header >
    )
}