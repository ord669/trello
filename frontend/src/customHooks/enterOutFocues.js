export function handleKeyPress(e) {
    if (e.keyCode === 13) {
        e.target.blur();
        //Write you validation logic here
    }
}

// For Use On input ==== >>> onKeyDown={(e) => handleKeyPress(e)}