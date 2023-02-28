import { useEffect, useRef, useState } from "react"
import { LoaderIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service"
import { utilService } from "../services/util.service"

export function BoardAddBg({ type, onChangeBoardBg }) {
    const [imgs, setImgs] = useState([])
    const [colors, setColors] = useState(boardService.getColors())
    const setUnsplash = useRef(utilService.debounce(loadImgs))

    useEffect(() => {
        loadImgs()
    }, [])

    function handleChange({ target }) {
        const { value } = target
        setUnsplash.current(value)
    }

    async function loadImgs(val) {
        try {
            const unsplashImgs = await boardService.getImgsFromUnsplash(val)
            setImgs(unsplashImgs.results)

        } catch (err) {
            console.log(err)
        }
    }

    if (!imgs.length) return <div className="loader"><LoaderIcon /></div>
    return (
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