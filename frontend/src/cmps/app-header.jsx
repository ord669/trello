import { ArrowDownIcon, BellIcon, BoardIcon, MainLogo } from '../assets/svg/icon-library'
import { useEffect, useState } from 'react'
import { CreateBoard } from './create-board'
import { BoardNotification } from './board-notifiaction'
import { BoardRecent } from './board-recent'
import tinycolor from 'tinycolor2'
import { utilService } from '../services/util.service'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation().pathname
    const [isRecent, setIsRecent] = useState(false)
    const [isStarred, setIsStarred] = useState(false)
    const [isCreateBoard, setIsCreateBoard] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    const [color, setColor] = useState('')
    const [boardColor, setBoardColor] = useState('')
    const { board } = useSelector(storeState => storeState.boardModule)

    useEffect(() => {
        setAvgColor()
        setDynamicColor()
        getBgStyle()

    }, [board])

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
            console.log('colorisDark: ', colorIsDark);
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
                    <span onClick={() => navigate(`/`)}>Jarvis</span>
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
            <div className='header-sec-container'>
                <button onClick={() => setIsNotification((prev) => !prev)} className="header-icon"> <BellIcon /></button>
                {isNotification && <BoardNotification />}
                <div className="account-item">
                    <span>O</span>
                </div>
            </div>

        </header>
    )
}