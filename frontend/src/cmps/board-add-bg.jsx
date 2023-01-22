import { useEffect, useRef, useState } from "react"
import { LoaderIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service.local"
import { saveBoard } from "../store/board/board.action"

export function BoardAddBg({ board, type }) {
    const [imgs, setImgs] = useState([])
    const [colors, setColors] = useState(boardService.getColors())

    async function onChangeBoardBg(bg) {
        console.log('bg: ', bg);
        const updatedBoard = board
        updatedBoard.style.background = bg
        try {
            await saveBoard(updatedBoard)

        } catch (err) {
            console.log('canot change background', err)
        }

    }


    useEffect(() => {
        loadImgs()
    }, [])



    async function loadImgs() {
        try {
            const unsplashImgs = await boardService.getImgsFromUnsplash()
            setImgs(unsplashImgs.results)

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <section className='board-add-bg'>

            {type === 'photo' && <div>
                {(!imgs.length) && <div className="loader"><LoaderIcon /></div>}
                <h3 className="bsm-title">Photos by Unsplash</h3>
                <div className="photos-container">
                    {imgs.map((img, idx) =>
                        <div onClick={() => onChangeBoardBg(img.urls.full)} key={idx} className="bp-img" style={{ backgroundImage: `url(${img.urls.full})` }} ></div>
                    )}
                </div>
            </div>}

            {type === 'color' && <div>
                <h3 className="bsm-title">Colors</h3>
                <div className="photos-container">
                    {colors.map((color, idx) =>
                        <div onClick={() => onChangeBoardBg(color)} key={idx} className="bp-img" style={{ background: color }} ></div>
                    )}
                </div>
            </div>}

        </section>
    )
}