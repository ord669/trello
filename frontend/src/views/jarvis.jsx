import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useSound from "use-sound";
// import video from '../assets/img/Jarvis.mp4'
import video from '../assets/img/Jarvis boot animation for 5.5 inch screens 1920x1080.mp4'
// import Jarvis from '../assets/img/Jarvis.mp4'
// import { Player } from 'video-react';

export function Jarvis({ setIsOpenJarvis }) {
    // const [play, setPlay] = useState(false)
    const audio = new Audio(video);


    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js";
        script.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js";
        script.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js";
        script.async = true;

        document.body.appendChild(script);

    }, [])

    return (
        <section>
            {/* <div className="jarvis-modal">
                <div className="container demo">
                    <div className="content">
                        <div id="large-header" className="large-header">
                            <canvas id="demo-canvas"></canvas>
                            <h1 className="main-title">Jarvis</h1>
                        </div>
                    </div>
                </div>

            </div> */}

        </section>
    )
}