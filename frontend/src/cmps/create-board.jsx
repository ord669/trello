import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BoardSkelton, CloseIcon } from "../assets/svg/icon-library"
// import { boardService } from "../services/board.service.local"
import { boardService } from "../services/board.service"
import { socketService, SOCKET_EMIT_SAVE_BOARD } from "../services/socket.service"
import { saveBoard } from "../store/board/board.action"

export function CreateBoard({ setIsCreateBoard }) {

    const defaultURL = 'https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674294790/photo-1674130070695-82aefa76ca67_bgworq.jpg'

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [BG, setBG] = useState({ url: defaultURL })
    const navigate = useNavigate()
    const bgImgs = boardService.getBgImgsURL()
    const bgColors = boardService.getColors().splice(0, 6)

    function handleChange({ target }) {
        const { value, name: filed } = target
        setBoard((prevBoard) => ({ ...prevBoard, [filed]: value }))
    }

    function setStyle() {
        let style
        if (BG.url.includes('https')) {
            style = {
                backgroundImage: `url(${BG.url})`
            }
        } else {
            style = {
                background: BG.url
            }
        }
        return style
    }

    async function onAddBoard() {
        board.style = {
            background: BG.url
        }
        try {
            const savedBoard = await saveBoard(board)
            console.log('savedBoard:', savedBoard);
            socketService.emit(SOCKET_EMIT_SAVE_BOARD, savedBoard)
            setIsCreateBoard(prev => !prev)  ///
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className='create-board-modal'>
            <button onClick={() => setIsCreateBoard(prev => !prev)} className='btn-close-modal'><CloseIcon /></button>
            <p className='create-board-title'>Create board</p>
            <div style={setStyle()} className='create-board-img'>
                <BoardSkelton />
            </div>
            <div>
                <p>Background</p>
                <div className="create-bgs">
                    {bgImgs.map(bgImg =>
                        <button key={bgImg._id} onClick={() => setBG(bgImg)}
                            className="bg-img"
                            style={{ backgroundImage: `url(${bgImg.url})` }}>
                        </button>
                    )}
                </div>
                <div className="create-bgs">
                    {bgColors.map((bgcolor, idx) =>
                        <button key={idx} onClick={() => setBG({ url: bgcolor })}
                            className="bg-color"
                            style={{ background: bgcolor }}>
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
        </section >
    )
}