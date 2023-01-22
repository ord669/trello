import { ArrowLeftIcon, CloseIcon } from "../assets/svg/icon-library";
import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board.service.local";
import { BoardAddBg } from "./board-add-bg";

export function BoardSideMenu({ setIsOpenSideMenu, board, isOpenSideMenu }) {
    // const [isChangeBg ,setIsChangeBg] = useState(false)
    const [isChangeBg, setIsChangeBg] = useState(false)
    const [isOpenBg, setIsOpenBg] = useState(false)
    const [type, setType] = useState('')
    const style = {
        backgroundImage: `url(${board.style.background})`,
    }

    function onCloseSideMenu() {
        setIsChangeBg(false)
        setIsOpenBg(false)
        setIsOpenSideMenu(prev => !prev)
    }

    function onOpenBgMenu(type) {
        setIsOpenBg(prev => !prev)
        setType(type)
    }



    return (
        <section className={isOpenSideMenu ? 'board-side-menu open' : 'board-side-menu'}>
            <button onClick={onCloseSideMenu} className="btn-close-modal"><CloseIcon /></button>

            {!isChangeBg && <section onClick={() => setIsChangeBg(prev => !prev)}>
                <h3 className="bsm-title">Menu</h3>
                <div className="bsm-content">
                    <div className="bsm-board-bg" style={style}></div>
                    <div>Change background</div>
                </div>
            </section>
            }

            {isChangeBg && <section className="bsm-add-bg ">
                {!isOpenBg && <section>
                    <p className="bsm-back" onClick={() => setIsChangeBg(prev => !prev)}><ArrowLeftIcon /></p>
                    <h3 className="bsm-title">Change background</h3>
                    <div className="bsm-add-bg-container">
                        <div >
                            <div onClick={() => onOpenBgMenu('photo')} className=" bsm-item bsm-item-img"></div>
                            <p>Photos</p>
                        </div>
                        <div >
                            <div onClick={() => onOpenBgMenu('color')} className=" bsm-item  bsm-item-color"></div>
                            <p>Colors</p>
                        </div>
                    </div>
                </section>
                }
                {isOpenBg &&
                    <div>
                        <p className="bsm-back" onClick={() => setIsOpenBg(prev => !prev)}><ArrowLeftIcon /></p>
                        <BoardAddBg type={type} board={board} />
                    </div>
                }
            </section>}


        </section >
    )
}