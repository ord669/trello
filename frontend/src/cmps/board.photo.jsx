import { useEffect, useRef, useState } from "react"
import { LoaderIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service.local"
import { saveBoard } from "../store/board/board.action"

export function BoardPhoto({ board }) {
    const [imgs, setImgs] = useState([])

    async function onChangeBoardBg(URL) {
        const updatedBoard = board
        updatedBoard.style.bgImgURL = URL
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
    if (!imgs.length) return <div className="loader"><LoaderIcon /></div>

    return (
        <section className='board-photo'>
            <h3 className="bsm-title">Photos by Unsplash</h3>
            <div className="photos-container">
                {imgs.map((img, idx) =>
                    <div onClick={() => onChangeBoardBg(img.urls.full)} key={idx} className="bp-img" style={{ backgroundImage: `url(${img.urls.full})` }} ></div>
                )}
            </div>

        </section>
    )
}