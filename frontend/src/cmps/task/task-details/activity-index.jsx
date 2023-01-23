import { useState } from "react"
import { ActivityIcon } from "../../../assets/svg/icon-library"
import { AddComment } from "./add-comment"

export function ActivityIndex() {
    const [isShown, setIsShown] = useState(false)

    return (
        <section className="activity-container">
            <section className="activity-header">
                <ActivityIcon className="icon-title" />
                <section>
                    <h3>Activity</h3>
                    <button className="btn-link" onClick={() => setIsShown(prevIsShown => !prevIsShown)}>{isShown ? 'Hide details' : 'Show details'}</button>
                </section>
            </section>
            <AddComment />
        </section>
    )
}