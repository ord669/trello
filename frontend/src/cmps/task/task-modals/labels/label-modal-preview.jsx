import tinycolor from "tinycolor2"

export function LabelPreview({ label }) {

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
    return (
        <div style={mainStyle} className="label-body-title-main-style">
            <div style={secStyle} className="sec-label-color"></div>
            <div>{label.title}</div>
        </div>
    )
}