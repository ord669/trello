import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tinycolor from "tinycolor2";
import { ArrowDownIcon, ArrowLeftIcon, BoardIcon, LoaderIcon } from "../assets/svg/icon-library";
import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { BoardStarred } from "./board-starred";

export function MainSidemenu({ isOpenMenu, setIsOpenMenu, board }) {
    const [color, setColor] = useState('')
    const [boardColor, setBoardColor] = useState('')
    const [boards, setBoards] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setAvgColor()
        setDynamicColor()
        loadBoards()

    }, [board])

    async function setAvgColor() {
        const bg = board.style.background
        if (bg.includes('https')) {
            try {
                const color = await utilService.getAvgColorImage(bg)
                setColor(color)
            } catch (err) {
                console.error(err)
            }
        }
        else {
            const color = bg
            setColor(color)
        }
    }

    async function loadBoards() {
        try {
            const boards = await boardService.query()
            setBoards(boards)
        }
        catch (err) {
            console.error(err)
        }
    }

    async function setDynamicColor() {
        const bg = board.style.background

        if (bg.includes('https')) {
            try {
                const colorIsDark = await utilService.getBgUrlIsDark(bg)
                console.log('colorisDark: ', colorIsDark);
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

    function darkenHexColor(hexColor, amount = 5) {
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }

    function getDynamicStyle() {
        const bg = board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                background: color.hex,
                color: boardColor
            }
        }
        else {
            style = {
                background: darkenHexColor(bg),
                color: boardColor
            }
        }
        return style
    }

    function getBgStyle(boardBg) {
        const bg = boardBg || board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                backgroundImage: `url(${bg})`,
            }
        }
        else {
            style = {
                background: bg,
            }
        }
        return style
    }

    // if (!board || !color) return <div className="loader"><LoaderIcon /></div>
    return (

        <section style={getDynamicStyle()} className={isOpenMenu ? 'main-side-menu open-menu' : 'main-side-menu'}>
            {!board || !color && <div className="loader"><LoaderIcon /></div>}
            <div className="msm-title">
                <div className="msm-board-bg" style={getBgStyle()}></div>
                <p >{board.title}</p>
                <button className="msm-btn-close" onClick={() => setIsOpenMenu(prev => !prev)} ><ArrowLeftIcon /></button>
            </div>

            <div className="msm-board-title" onClick={() => navigate('/board')}>
                <BoardIcon />
                <p>Boards</p>
            </div>
            <div>
                <p className="msm-your-boards">Your Boards</p>

                {boards && boards.map(board =>
                    <div key={board._id} className="msm-boards-list">
                        <div onClick={() => navigate(`/board/${board._id}`)} key={board._id} className="msm-card">
                            <div className="flex align-center gap-10">
                                <div className="msm-card-bg" style={getBgStyle(board.style.background)}></div>
                                <p>{board.title}</p>
                            </div>
                            <button style={{ display: board.isStarred ? 'block' : '' }} className="msm-btn-star" ><BoardStarred board={board} /></button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
