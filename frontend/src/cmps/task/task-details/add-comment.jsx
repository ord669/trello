import { useState } from "react"
import { CloseIcon } from "../../../assets/svg/icon-library"

export function AddComment({ username }) {
    const [title, setTitle] = useState('')
    const [isShown, setIsShown] = useState(false)

    function handleChange({ target }) {
        setTitle(target.value)
    }

    function onSaveComment() {
        if (!title) return
        console.log('title:', title)
        setTitle('')
    }

    function onClose() {
        setIsShown(prevIsShown => !prevIsShown)
        setTitle('')
    }

    return (
        <section className="add-comment">
            <section className="user-avatar-icon" style={{ backgroundImage: `url(https://robohash.org/${username || 'liad'}?set=set5)` }}></section>
            <section className={`write-comment ${isShown ? 'show' : ''}`}>
                <textarea
                    onClick={() => setIsShown(true)}
                    name="title"
                    placeholder="Write a comment..."
                    onChange={handleChange}
                    value={title}
                // onKeyDown={(ev) => handleKeyPress(ev)} 
                />
                {isShown &&
                    <section className="btns-container">
                        <button className="btn-link" onClick={onSaveComment}>Save</button>
                        <button className="close-btn" onClick={onClose}><CloseIcon /></button>
                    </section>
                }
            </section>
        </section>
    )
}