import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export function TaskDetailsLabels({ labelId }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const [label, setLabel] = useState({})

    useEffect(() => {
        getLabel(labelId)
    }, [])

    function getLabel(labelId) {
        const currLabel = board.labels.find(label => label._id === labelId)
        setLabel(currLabel)
    }

    // const style = {
    //     backgroundColor: label.color
    // }


    return (
        <section className='task-details-labels'>
            <div className="main-label-color">
                <p>label</p>
                {/* <div className="sec-label-color"></div> */}
            </div>

        </section>
    )
}