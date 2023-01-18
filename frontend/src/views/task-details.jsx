export function TaskDetails() {
    return (
        <section className='task-details'>
            <div className="black-screen"></div>
            <div className="main-task-details">
                <button className="details-close-btn">x</button>
                <div className="task-details-cover">cover</div>
                <div className="task-details-title">title</div>
                <div className="task-details-content">
                    <div className="task-details-description">
                        <h1>Description</h1>
                        <input type="text" />
                    </div>
                    <div className="task-details-checklist">
                        <h1>CheckList</h1>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>

                    <div className="task-details-activity">
                        <h1>Activity</h1>
                    </div>

                </div>
                <div className="task-details-side-menu">aside</div>
            </div>
        </section>
    )
}


