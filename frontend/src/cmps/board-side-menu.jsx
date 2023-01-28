import { ArrowLeftIcon, CloseIcon, ActivityIcon, PlusIcon } from "../assets/svg/icon-library";
import { useEffect, useRef, useState } from "react"
import { BoardAddBg } from "./board-add-bg";
import { BoardActivity } from "./board-activity";
import { useForm } from "../customHooks/useForm";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";
import { DebounceInput } from "react-debounce-input";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { saveBoard } from "../store/board/board.action";

export function BoardSideMenu({ setIsOpenSideMenu, board, isOpenSideMenu }) {
    const [isChangeBg, setIsChangeBg] = useState(false)
    const [isOpenBg, setIsOpenBg] = useState(false)
    const [type, setType] = useState('')
    const [imgSource, setImgSource] = useState()
    const [imgDesc, setImgDesc, handleChange] = useForm('')

    useEffectUpdate(async () => {
        // const img = await boardService.createAiImg(imgDesc.txt)
        // setImgSource(img)
        // onChangeBoardBg(img)
    }, [imgDesc, imgSource])

    async function onChangeBoardBg(bg) {
        const updatedBoard = { ...board }
        updatedBoard.style.background = bg
        try {
            await saveBoard(updatedBoard)

        } catch (err) {
            console.log('canot change background', err)
        }

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

    function getBgStyle() {
        const bg = board.style.background
        let style
        if (bg.includes('https')) {
            style = {
                backgroundImage: `url(${bg})`
            }
        }
        else {
            style = {
                background: bg
            }
        }
        return style
    }

    return (
        <section className={isOpenSideMenu ? 'board-side-menu open' : 'board-side-menu'}>
            <button onClick={onCloseSideMenu} className="btn-close-modal"><CloseIcon /></button>

            {!isChangeBg && <section >
                <div onClick={() => setIsChangeBg(prev => !prev)} >
                    <h3 className="bsm-title">Menu</h3>
                    <div className="bsm-content">
                        <div className="bsm-board-bg" style={getBgStyle()}></div>
                        <div>Change background</div>
                    </div>
                </div>
                <section className="bsm-activity">
                    <div className="flex align-center gap-10" >
                        <ActivityIcon board={board} />
                        <p>Activity</p>
                    </div>
                </section>
            </section>
            }
            {!isChangeBg && <BoardActivity board={board} />}

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
                        <BoardAddBg type={type} board={board} onChangeBoardBg={onChangeBoardBg} />
                    </div>
                }

                <DebounceInput
                    minLength={2}
                    debounceTimeout={1000}
                    onChange={handleChange}
                    name='txt' />

                {/* <input type="text" onChange={handleChange} name="txt" id="" /> */}
                <img src={imgSource} width={'200px'} height={"200px"} alt="" />
            </section>}

        </section >
    )
}