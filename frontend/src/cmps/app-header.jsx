import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { login, logout, signup } from '../store/user.actions.js'
// import { LoginSignup } from './login-signup.jsx'
import { ArrowDownIcon, BellIcon, BoardIcon, LoaderIcon } from '../assets/svg/icon-library'
import { useEffect, useState } from 'react'
import { CreateBoard } from './create-board'
import { BoardNotification } from './board-notifiaction'
import { BoardRecent } from './board-recent'
import tinycolor from 'tinycolor2'
import { utilService } from '../services/util.service'

export function AppHeader() {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const [isHome, setIsHome] = useState(false)
    const [isRecent, setIsRecent] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const [isCreateBoard, setIsCreateBoard] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    const { board } = useSelector(storeState => storeState.boardModule)
    const [color, setColor] = useState('')



    useEffect(() => {
        setAvgColor()
        if (location.length > 1) setIsHome(false)
        else setIsHome(true)
    }, [location, board])


    async function setAvgColor() {
        if (!board) return
        const bg = board.style.background
        if (bg.includes('https')) {
            try {
                const color = await utilService.getAvgColorImage(bg)
                setColor(color)
            } catch (err) {
                console.error("cannot read bg ", err)
            }
        }
        else {
            const color = bg
            setColor(color)
        }

    }

    function darkenHexColor(hexColor, amount = 5) {
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }

    function getBgStyle() {
        const bg = board.style.background
        let style
        if (location.length === 6) {
            console.log('location:', location)
            style = {
                background: "#026AA7"
            }
        }


        else if (bg.includes('https')) {
            style = {
                background: color.hex

            }
        }
        else {
            style = {
                background: darkenHexColor(bg),
            }
        }
        return style
    }

    if (!color || !board) return <div className='loader'><LoaderIcon /></div>
    return (
        <section className={`${isHome ? 'home-header' : 'app-header'} full`}>

            {!isHome &&
                <header style={getBgStyle()} className='app-header '>
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
                        <button onClick={() => navigate('/board')} className='btn-get-trello'>Get Trello for free</button>
                    </div>
                </div>
            </header >
            }

        </section >
    )
}