async function getAiBoardFromChat(prompt) {
    try {
        const script = await dbService.getBoardScript(prompt)
        const lines = script.split('\n')
        const groups = lines.reduce((acc, line) => {
            if (line.includes('$') && !line.includes('Object')) {
                const group = { groupTitle: _removeSpecialChars(line), tasks: [] }
                acc.push(group)
            } else if (line.includes('∞')) {
                const task = { taskTitle: _removeSpecialChars(line) }
                acc[acc.length - 1].tasks.push(_removeSpecialChars(line))
            }
            return acc
        }, [])
    } catch (err) {
        console.log('err from getiin ai in board sevice', err)
        throw err
    }
}

function _removeSpecialChars(str) {
    return str.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
}