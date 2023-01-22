import { ArrowLeftIcon, CloseIcon } from "../assets/svg/icon-library";
import { useEffect, useRef, useState } from "react"
import { boardService } from "../services/board.service.local";
import { BoardPhoto } from "./board.photo";

export function BoardSideMenu({ setIsOpenSideMenu, board, isOpenSideMenu }) {
    // const [isChangeBg ,setIsChangeBg] = useState(false)
    const [isChangeBg, setIsChangeBg] = useState(false)
    const [isOpenPhoto, setIsOpenPhoto] = useState(false)
    const style = {
        backgroundImage: `url(${board.style.bgImgURL})`,
    }

    function onCloseSideMenu() {
        setIsChangeBg(false)
        setIsOpenPhoto(false)
        setIsOpenSideMenu(prev => !prev)
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
                {!isOpenPhoto && <section>
                    <p className="bsm-back" onClick={() => setIsChangeBg(prev => !prev)}><ArrowLeftIcon /></p>
                    <h3 className="bsm-title">Change background</h3>
                    <div className="bsm-add-bg-container">
                        <div >
                            <div onClick={() => setIsOpenPhoto(prev => !prev)} className=" bsm-item bsm-item-img"></div>
                            <p>Photos</p>
                        </div>
                        <div >
                            <div className=" bsm-item  bsm-item-color"></div>
                            <p>Colors</p>
                        </div>
                    </div>
                </section>
                }
                {isOpenPhoto &&
                    <div>
                        <p className="bsm-back" onClick={() => setIsOpenPhoto(prev => !prev)}><ArrowLeftIcon /></p>
                        <BoardPhoto board={board} />
                    </div>
                }
            </section>}


        </section >
    )
}