import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import tinycolor from "tinycolor2"
import { toggleTaskLabel } from "../../../store/board/board.action"

export function LabelPreview({ labelId, task }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const [label, setLabel] = useState({})
    const [color, setColor] = useState('')

    useEffect(() => {
        getLabel(labelId)
    }, [])

    function getLabel(labelId) {
        const currLabel = board.labels.find(label => label._id === labelId)
        setLabel(currLabel)
        setColor(currLabel.color)
    }

    function darkenHexColor(hexColor, amount = 20) {
        let color = tinycolor(hexColor)
        let darkerColor = color.darken(amount).toHexString()
        return darkerColor
    }

    const mainStyle = {
        backgroundColor: label.color
    }

    const secStyle = {
        backgroundColor: darkenHexColor(label.color)
    }

    if (!label) return <div>loading...</div>
    return (
        <section style={mainStyle} onClick={() => toggleTaskLabel(labelId, task.groupId, task._id)}
            className='label-preview flex align-center space-between'>
            <div style={secStyle} className="sec-label-color"></div>
            <div>{label.title}</div>
        </section>
    )
}