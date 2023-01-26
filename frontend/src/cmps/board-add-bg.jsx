import { useEffect, useRef, useState } from "react"
import { LoaderIcon, ManIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service.local"
// import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"
import { saveBoard } from "../store/board/board.action"

export function BoardAddBg({ board, type }) {
    const [imgs, setImgs] = useState([])
    const [colors, setColors] = useState(boardService.getColors())
    const [imgVal, setImgVal] = useState('london')
    const setUnsplash = useRef(utilService.debounce(loadImgs))

    async function onChangeBoardBg(bg) {
        console.log('bg: ', bg);
        const updatedBoard = { ...board }
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

    function handleChange({ target }) {
        const { value } = target
        setUnsplash.current(value)
    }

    async function loadImgs(val) {
        console.log('val from babg: ', val);
        try {
            const unsplashImgs = await boardService.getImgsFromUnsplash(val)
            setImgs(unsplashImgs.results)

        } catch (err) {
            console.log(err)
        }
    }

    if (!imgs.length) return <div className="loader"><LoaderIcon /></div>
    return (
        // { (!imgs.length) && <div className="loader"><LoaderIcon /></div> }
        <section className='board-add-bg'>

            {type === 'photo' && <div>
                <h3 className="bsm-title">Photos by Unsplash</h3>
                <div className="bsm-input">
                    <input placeholder="Search Photo"
                        type="text"
                        onChange={handleChange}
                    />
                </div>
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