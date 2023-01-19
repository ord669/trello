import { FilterIcon } from "../assets/svg/icon-library";

export function ToolBar({ board }) {
    return (
        <section className='tool-bar full'>
            <h2>{board.title}</h2>
            {/* <button className="btn-header">
                <div className="icon">
                    <FilterIcon />
                </div>
                <p>Filter</p>
            </button> */}
        </section>
    )
}