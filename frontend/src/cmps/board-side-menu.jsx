import { CloseIcon } from "../assets/svg/icon-library";

export function BoardSideMenu({ setIsOpenSideMenu }) {
    return (
        <section className='board-side-menu'>
            <button onClick={() => setIsOpenSideMenu(prev => !prev)} className="btn-close-modal"><CloseIcon /></button>
            <h3 className="bsm-title">Menu</h3>


        </section>
    )
}