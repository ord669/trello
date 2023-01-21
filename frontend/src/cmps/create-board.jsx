import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoardSkelton, CloseIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service.local"
import { saveBoard } from "../store/board/board.action"

export function CreateBoard({ setIsCreateBoard }) {

    const defaultURL = 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294790/photo-1674130070695-82aefa76ca67_bgworq.jpg'

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [imgURL, setImgURL] = useState({ url: defaultURL })
    const navigate = useNavigate()
    const bgImgs = boardService.getBgImgsURL()

    function handleChange({ target }) {
        const { value, name: filed } = target
        setBoard((prevBoard) => ({ ...prevBoard, [filed]: value }))
    }

    const backgroundStyle = {
        backgroundImage: `url(${imgURL.url})`
    }

    async function onAddBoard() {
        board.style = {
            bgImgURL: imgURL.url
        }
        try {
            const savedBoard = await saveBoard(board)
            setIsCreateBoard(prev => !prev)
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className='create-board-modal'>
            <button onClick={() => setIsCreateBoard(prev => !prev)} className='btn-close-modal'><CloseIcon /></button>
            <p className='create-board-title'>Create board</p>
            <div style={backgroundStyle} className='create-board-img'>
                <BoardSkelton />
            </div>
            <div>
                <p>Background</p>
                <div className="create-bgs">
                    {bgImgs.map(bgImg =>
                        <button key={bgImg._id} onClick={() => setImgURL(bgImg)}
                            className="bg-img"
                            style={{ backgroundImage: `url(${bgImg.url})` }}>
                        </button>
                    )}
                </div>
            </div>
            <div className='board-title-add'>
                <p>Board title</p>
                <input
                    type="text"
                    name="title"
                    value={board.title}
                    onChange={handleChange}
                />
            </div>
            <button onClick={onAddBoard} className='btn-add'>Save</button>
        </section>
    )
}