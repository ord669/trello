import { utilService } from "../../../services/util.service"

export function CommentPreview({ comment }) {
    return (
        <section className='comment-preview'>
            <section className="comment-img"
                style={{ backgroundImage: `url(${comment.byMember.imgUrl})` }}>
            </section>
            <section className="comment-content">
                <span className="comment-name">
                    {comment.byMember.fullname}
                </span>
                <span className="comment-time">
                    {utilService.formatTime(comment.createdAt)}
                </span>
                <section className="comment-txt">{comment.txt}</section>
            </section>
        </section>
    )
}