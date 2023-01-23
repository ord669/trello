import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { ArrowDownIcon, ArrowLeftIcon } from "../assets/svg/icon-library";
import { utilService } from "../services/util.service";

export function MainSidemenu({ isOpenMenu, setIsOpenMenu, board }) {
    const [color, setColor] = useState('')

    useEffect(() => {
        setAvgColor()

    }, [])
    async function setAvgColor() {
        const color = await utilService.getAvgColorImage(board.style.background)
        setColor(color)
    }
    function darkenHexColor(hexColor, amount = 20) {
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }

    function getBgStyle() {
        const bg = board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                background: color.hex,
                width: isOpenMenu ? "260px" : "0px"
            }
        }
        else {
            style = {
                background: darkenHexColor(bg),
                width: isOpenMenu ? "260px" : "0px"
            }
        }
        return style
    }



    return (
        <section style={getBgStyle()} className='main-side-menu'>
            <button onClick={() => setIsOpenMenu(prev => !prev)} className="btn-close-modal"><ArrowLeftIcon /></button>

        </section >

    )
}

