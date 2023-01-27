import { useEffect, useState } from "react"
import tinycolor from "tinycolor2"
import { PenIcon } from "../../../../assets/svg/icon-library"
import { toggleTaskLabel } from "../../../../store/task/task.action"

export function LabelPreview({ label, checkForLabelIncluded, currTask }) {
    const [isClicked, setIsClicked] = useState(checkForLabelIncluded(label._id))

    useEffect(() => {
        // setIsClicked(checkForLabelIncluded(label._id))

        return () => {

        }
    }, [])

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
    function checkForChecked() {
        checkForLabelIncluded(label._id)
        setIsClicked((prev) => !prev)
    }
    return (
        <div
            className="label-container"
            onClick={() => {
                toggleTaskLabel(label._id, currTask.groupId, currTask._id)
                setTimeout(setIsClicked(!checkForLabelIncluded(label._id)), 1000)


            }}
            key={label._id}>
            <input type="checkbox" onChange={() => { }} checked={isClicked} />

            <div style={mainStyle} className="label-body-title-main-style">
                <div style={secStyle} className="sec-label-color"></div>
                <div>{label.title}</div>
            </div>
            <button> <PenIcon /></button>

        </div>
    )
}