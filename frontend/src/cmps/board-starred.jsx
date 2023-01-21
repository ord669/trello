import { useEffect, useState } from "react"
import { EmptyStarIcon, FullStarIcon } from "../assets/svg/icon-library"
import { boardService } from "../services/board.service.local"
import { saveBoard } from "../store/board/board.action"

export function BoardStarred({ board }) {
    const [isStarred, setIsStarred] = useState(board.isStarred)

    async function setBoardIsStarred() {
        const updatedBoard = board
        updatedBoard.isStarred = !updatedBoard.isStarred
        try {
            await boardService.save(updatedBoard)
            setIsStarred((prev) => !prev)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <section onClick={setBoardIsStarred} className="board-starred">
            {isStarred ? <FullStarIcon /> : <EmptyStarIcon />}
        </section>
    )
}