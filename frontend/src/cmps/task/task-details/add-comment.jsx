import { useState } from "react"
import { CloseIcon } from "../../../assets/svg/icon-library"
import { taskService } from "../../../services/task.service"

export function AddComment({ username, saveComment }) {
    const [comment, setComment] = useState(taskService.getEmptyComment())
    const [isShown, setIsShown] = useState(false)

    function handleChange({ target }) {
        const { value, name: feild } = target
        setComment(prevComment => ({ ...prevComment, [feild]: value }))
    }

    function onSaveComment() {
        if (!comment.txt) return
        console.log('comment:', comment)
        comment.createdAt = Date.now()
        saveComment(comment)
        onClose()
    }

    function onClose() {
        setIsShown(prevIsShown => !prevIsShown)
        setComment(taskService.getEmptyComment())
    }

    return (
        <section className="add-comment">
            <section className="user-avatar-icon" style={{ backgroundImage: `url(https://robohash.org/${username || 'liad'}?set=set5)` }}></section>
            <section className={`write-comment ${isShown ? 'show' : ''}`}>  {/* onBlur={onClose} */}
                <textarea
                    onClick={() => setIsShown(true)}
                    name="txt"
                    placeholder="Write a comment..."
                    onChange={handleChange}
                    value={comment.txt}
                // onKeyDown={(ev) => handleKeyPress(ev)} 
                />
                {isShown &&
                    <section className="btns-container">
                        <button className={comment.txt ? 'btn-add' : 'btn-link'} onClick={onSaveComment}>Save</button>
                        <button className="close-btn" onClick={onClose}><CloseIcon /></button>
                    </section>
                }
            </section>
        </section>
    )
}