import { useEffect, useState } from "react";
import { useForm } from "../../../../customHooks/useForm";
import { boardService } from "../../../../services/board.service";
import { saveTask } from "../../../../store/task/task.action";
import { ImgUploader } from "../../../img-uploader";

export function CoverModal({ board, currTask }) {
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

    async function onUploadedImg(url) {
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
                                <div onClick={() => {
                                    currTask.style.background = color
                                    try {
                                        saveTask(currTask)
                                    } catch (err) {
                                        console.log('err from cover save color', err)
                                    }
                                }} key={idx} className="bp-color" style={{ background: color }} ></div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <ImgUploader onUploaded={onUploadedImg} type={'cover'} styleClass={{ coverLabelBtn: 'btn-link' }} />

            <section className='modal-covers-list-container'>
                <h4>Photos from Unsplash</h4>
                <div className="modal-covers-list-body">
                    <div className="modal-covers-photos-container">
                        {imgs.map(img =>
                            <div onClick={() => {
                                currTask.style.background = img.urls.full
                                try {
                                    saveTask(currTask)
                                } catch (err) {
                                    console.log('err from save img bg', err)
                                }
                            }} key={img.id} className="bp-img" style={{ backgroundImage: `url(${img.urls.full})` }} ></div>
                        )}
                    </div>
                </div>
            </section>
        </section>
    )
}