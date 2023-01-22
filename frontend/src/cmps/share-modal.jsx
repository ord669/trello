import { CloseIcon, ShareIcon } from "../assets/svg/icon-library";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ShareModal({ setIsOpenShare }) {

    function onCopyLink() {
        navigator.clipboard.writeText(window.location.href);
        showSuccessMsg('Link copied')
    }
    return (
        <section>
            <div onClick={() => setIsOpenShare(prev => !prev)} className="black-modal"></div>
            <div className="share-modal">
                <div className="share-modal-header">
                    <p>Share Board</p>
                    <button onClick={() => setIsOpenShare(prev => !prev)}><CloseIcon /></button>
                </div>
                <div className="modal-header-container">
                    <p className="share-modal-icon"><ShareIcon /></p>
                    <div className="modal-header-content">
                        <p>Anyone with the board share link</p>
                        <button onClick={onCopyLink} className="btn-copy-link">Copy link</button>
                    </div>

                </div>

            </div>

        </section>
    )
}