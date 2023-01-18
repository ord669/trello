export function ToolBar({ board }) {
    console.log('board: ', board);
    return (
        <section className='tool-bar full'>
            <h2>{board.title}</h2>
        </section>
    )
}