import { useRef, useState } from "react";
import { DescriptionIcon } from "../../assets/svg/icon-library";

export function TaskDetailsDescription({ description }) {

    const [isShown, setIsShown] = useState(false)
    // const elTextArea = useRef()
    const inputReference = useRef(null);


    function onShownDesc() {
        setIsShown(prev => !prev)

    }
    return (
        <div className="task-details-description ">
            <div className="flex align-center gap-10">
                <DescriptionIcon className='icon-title' />
                <h1>Description</h1>
            </div>
            <div>
                {!isShown ?
                    <p onClick={onShownDesc} className="description-fake-text-area"> {description || 'add a more detailed description…'}</p>
                    :
                    <div>
                        <textarea autoFocus type="text"
                            defaultValue={description || 'add a more detailed description…'} />
                        <div className="desc-btn flex align-cetner ">
                            <button className="btn-add">Save</button>
                            <button onClick={() => setIsShown((prev) => !prev)}
                                className="btn-cancel">Cancel</button>
                        </div>

                    </div>
                }

            </div>


        </div >
    )
}