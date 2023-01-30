async function getAiBoardFromChat(prompt) {
    try {
        const script = await aiService.getBoardScript(prompt)
        const lines = script.split('\n')
        const groups = lines.reduce((acc, line) => {
            if (line.includes('$')) {
                const group = { groupTitle: _removeSpecialChars(line), tasks: [] }
                acc.push(group)
            } else if (line.includes('∞')) {
                const task = { taskTitle: _removeSpecialChars(line) }
                const lastGroupIdx = acc.length - 1
                acc[lastGroupIdx].tasks.push(_removeSpecialChars(line))
            }
            return acc
        }, [])
    } catch (err) {
        console.log('err from get ai board sevice', err)
        throw err
    }
}

function _removeSpecialChars(str) {
    return str.replace(/(?!\w|\s)./g, '')
}