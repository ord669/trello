import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useSound from "use-sound";
import video from '../assets/img/Jarvis.mp4'
// import video from '../assets/img/Jarvis boot animation for 5.5 inch screens 1920x1080.mp4'
// import Jarvis from '../assets/img/Jarvis.mp4'
// import { Player } from 'video-react';

export function Jarvis({ setIsOpenJarvis }) {
    // const [play, setPlay] = useState(false)
    const audio = new Audio(video);


    return (
        <section>
            <div onClick={() => setIsOpenJarvis(prev => !prev)} className="black-modal"></div>
            <div className="jarvis-modal">
                <div className='jarvis-video'>
                    <ReactPlayer playing={true} url={video} />
                </div>

            </div>

        </section>
    )
}