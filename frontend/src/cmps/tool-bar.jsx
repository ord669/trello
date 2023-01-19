import { FilterIcon, MoreTreeDotsIcon, StartIconEmpty } from "../assets/svg/icon-library";
import { UserAvatarIcon } from "./user-avatar-icon";

export function ToolBar({ board }) {
    return (
        <section className='tool-bar full'>
            <h2>{board.title}</h2>

            <div className="tool-bar-btns">

                <button className="btn-header ">
                    <FilterIcon className="spacing" />
                    Filter
                </button>
                <p>|</p>
                <UserAvatarIcon />
                <p>|</p>
                <button className="btn-header btn-header-square">
                    <MoreTreeDotsIcon className="icon" />
                </button>

            </div>
        </section>
    )
}