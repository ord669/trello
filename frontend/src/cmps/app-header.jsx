import { ArrowDownIcon, BellIcon, MainLogo, PlusIcon } from '../assets/svg/icon-library'
import { useEffect, useState } from 'react'
import { CreateBoard } from './create-board'
import { BoardNotification } from './board-notifiaction'
import { BoardRecent } from './board-recent'
import tinycolor from 'tinycolor2'
import { utilService } from '../services/util.service'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import useSound from 'use-sound'
import jarviseIntro from '../assets/mp3/jarvisIntro.mp3';
import { Jarvis } from '../views/jarvis'
import { userService } from '../services/user.service'
import { UserAvatarIcon } from './user-avatar-icon'
import { Acount } from './acount'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation().pathname
    const [isRecent, setIsRecent] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const [isCreateBoard, setIsCreateBoard] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    const [isOpenAcount, setIsOpenAccount] = useState(false)
    const [color, setColor] = useState('')
    const [boardColor, setBoardColor] = useState('')
    const { board } = useSelector(storeState => storeState.boardModule)
    const [isJarvis, setIsJarvis] = useState(false)
    const [jarvisIntro] = useSound(jarviseIntro);
    const [loggdinUser, setLoggdinUser] = useState({})
    const [firsTimeOpen, setfirsTimeOpen] = useState(false)

    useEffect(() => {
        setAvgColor()
        setDynamicColor()
        getBgStyle()
        setLoggdinUser(userService.getLoggedinUser)
    }, [board,])

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
        if (!board) return
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }
    function getBgStyle() {
        let style
        if (!board) {
            return style = {
                background: "#026AA7",
                color: '#fff',
                fill: boardColor
            }
        }
        const bg = board.style.background
        if (location.length === 6) {
            style = {
                background: "#026AA7",
                color: "#fff",
                fill: '#fff',
            }
        }

        else if (bg.includes('https')) {
            style = {
                background: color.hex,
                color: boardColor,
                fill: boardColor
            }
        }
        else {
            style = {
                background: darkenHexColor(bg),
                color: boardColor,
                fill: boardColor
            }
        }
        return style
    }
    async function setDynamicColor() {
        if (!board) return
        const bg = board.style.background

        if (bg.includes('https')) {
            try {
                const colorIsDark = await utilService.getBgUrlIsDark(bg)
                const color = colorIsDark ? "#fff" : "#172b4d"
                setBoardColor(color)
            } catch (err) {
                console.error(err)
            }
        }

        else {
            const colorIsDark = utilService.getBgIsDarkColorHex(bg)
            const color = colorIsDark ? "#fff" : "#172b4d"
            setBoardColor(color)
        }
    }

    function logoStyle() {
        let style = {}
        if (location.length === 6) {
            style = {
                fill: '#fff'
            }
        }
        return style
    }
    if (!board && location.length !== 6) return
    return (
        <header className='app-header full' style={getBgStyle()} >
            <div className='flex align-center' >
                <div style={logoStyle()} className='header-logo flex align-center'>
                    <MainLogo />
                    <span onClick={() => navigate(`/board`)}>Jarvis</span>
                </div>
                <div>
                    <div className=' header-main-btns ' >
                        <div className='header-item'>
                            <button className='btn-header-more btn-bar '>More</button>
                        </div>
                        <div className='header-item'>
                            <button onClick={() => setIsRecent(prev => !prev)} className='btn-app-header' >Recent <ArrowDownIcon /></button>
                            {isRecent && <BoardRecent setIsRecent={setIsRecent} type={'recent'} />}
                        </div>
                        <div className='header-item'>
                            <button onClick={() => setIsStarred(prev => !prev)} className='btn-app-header'>Starred <ArrowDownIcon /></button>
                            {isStarred && <BoardRecent type={'starred'} />}
                        </div>
                        <div className='header-item'>
                            <button onClick={() => setIsCreateBoard(prev => !prev)} className="btn-bar">
                                <span className='create'>Create</span>
                                <span className='plus'><PlusIcon /></span>
                            </button>
                            {isCreateBoard && <CreateBoard
                                setIsCreateBoard={setIsCreateBoard}
                                setIsJarvis={setIsJarvis}
                                jarvisIntro={jarvisIntro}
                                setfirsTimeOpen={setfirsTimeOpen}
                                firsTimeOpen={firsTimeOpen} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className='header-sec-container'>
                <button onClick={() => setIsNotification((prev) => !prev)} className="header-icon"> <BellIcon /></button>
                {isNotification && <BoardNotification />}
                <div onClick={() => setIsOpenAccount(prev => !prev)} className="account-item">
                    <div><UserAvatarIcon member={loggdinUser} /></div>
                </div>
            </div>
            {isJarvis && <Jarvis setIsJarvis={setIsJarvis} />}
            {isOpenAcount && <Acount setLoggdinUser={setLoggdinUser} setIsOpenAccount={setIsOpenAccount} />}
        </header>
    )
}