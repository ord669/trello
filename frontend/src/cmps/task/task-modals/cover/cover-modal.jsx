import { useEffect, useState } from "react";
import { useForm } from "../../../../customHooks/useForm";
import { boardService } from "../../../../services/board.service.local";
import { saveTask } from "../../../../store/board/board.action";
import { ImgUploader } from "../../../img-uploader";

export function CoverModal({ board, currTask, getMembers, onCoverChangeBg }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })
    const [imgs, setImgs] = useState([])
    const [colors, setColors] = useState(boardService.getColors())

    useEffect(() => {
        loadImgs()
    }, [])

    async function loadImgs(val) {
        try {
            const unsplashImgs = await boardService.getImgsFromUnsplash(val)
            unsplashImgs.results.splice(0, 4)
            setImgs(unsplashImgs.results)
        } catch (err) {
            console.log(err)
        }
    }

    function onChangeCoverBg(url) {
        console.log('url: ', url);

    }
    async function onUploadedImg(url) {
        console.log('url: ', url)
        currTask.style.background = url
        try {
            saveTask(currTask)
        } catch (err) {
            console.log('err', err)
        }
    }

    if (!imgs) return
    console.log('imgs: ', imgs);
    return (
        <section className='covers-modal-container'>
            <div className="covers-modal-header">
            </div>
            <section className='modal-covers-list-container'>
                <div className="modal-covers-list-body">
                    <div>
                        <h4 >Colors</h4>
                        <div className="modal-covers-colors-container">
                            {colors.map((color, idx) =>
                                <div onClick={() => onCoverChangeBg(color)} key={idx} className="bp-color" style={{ background: color }} ></div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <ImgUploader onUploaded={onUploadedImg} />

            <section className='modal-covers-list-container'>
                <h4>Photos from Unsplash</h4>
                <div className="modal-covers-list-body">
                    <div className="modal-covers-photos-container">
                        {imgs.map(img =>
                            <div onClick={() => onCoverChangeBg(img.urls.full)} key={img.id} className="bp-img" style={{ backgroundImage: `url(${img.urls.full})` }} ></div>
                        )}
                    </div>
                </div>
            </section>
        </section>
    )
}