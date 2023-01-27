import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useSound from "use-sound";
import video from '../assets/img/Jarvis.mp4'

export function Jarvis({ volume, muted }) {
    // const [play] = useSound(video);
    const [play, setPlay] = useState(false)
    // const audio = new Audio(video);

    setTimeout(() => { setPlay(true) }, 200);
    // useEffect(() => {

    // }, [])

    return (
        <section className='Jarvuse'>

            <div className='player-wrapper'>

            </div>
            <button onClick={() => {

            }}>play</button>
        </section>
    )
}