import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import tinycolor from "tinycolor2"

export function TaskPreviewLabels({ labelId }) {
    const { board } = useSelector(storeState => storeState.boardModule)
    const [label, setLabel] = useState({})
    const [color, setColor] = useState('')

    useEffect(() => {
        getLabel(labelId)
    }, [])

    function getLabel(labelId) {
        const currLabel = board.labels.find(label => label._id === labelId)
        setLabel(currLabel)
        if (!currLabel.color) return
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

    // if (!label) return <div>loading...</div>
    return (
        <section style={secStyle} className='task-preview-label'>
            <div style={mainStyle} className="sec-label-color"></div>
        </section>
    )
}