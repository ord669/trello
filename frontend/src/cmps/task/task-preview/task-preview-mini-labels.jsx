import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import tinycolor from "tinycolor2"
import { toggleLabelSize } from "../../../store/task/task.action"

export function TaskPreviewLabels({ labelId }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const [label, setLabel] = useState({})
    const { isLabelMini } = useSelector(storeState => storeState.boardModule)

    useEffect(() => {
        getLabel(labelId)
    }, [])

    function getLabel(labelId) {
        const currLabel = board.labels.find(label => label._id === labelId)
        setLabel(currLabel)
        if (!currLabel.color) return
    }

    function darkenHexColor(hexColor, amount = 20) {
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }

    function onChangeLabelSize(ev) {
        ev.stopPropagation()
        toggleLabelSize()
    }

    const mainStyle = {
        backgroundColor: label.color
    }

    const secStyle = {
        backgroundColor: darkenHexColor(label.color),
    }

    return (

        <section className='label-container' onClick={(ev) => onChangeLabelSize(ev)}>
            <section style={isLabelMini ? secStyle : mainStyle}
                className={isLabelMini ? 'task-preview-label' : 'task-preview-label open'}>
                {!isLabelMini && <div style={secStyle} className={'sec-label-big'}></div>}
                {!isLabelMini && <div>{label.title}</div>}
            </section>
        </section >
    )
}