import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input"
import { useForm } from "../customHooks/useForm"
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { createAiBoard } from "../store/board/board.action";
import { useNavigate, useParams } from "react-router-dom";
import useSound from "use-sound";
// import { JarvisHeart } from "./jarvis-heart";
import jarvisAction from '../assets/mp3/jarvisActionGo.mp3';
import jarvisFinish from '../assets/mp3/jarvisActionDidHisJob.mp3';
import { MainLogo } from "../assets/svg/icon-library";
// import { JarvisAnimation } from "./jarvis-animation";

export function Jarvis({ setIsOpenJarvis, setIsJarvis }) {
    const [isDisable, setIsDisable] = useState(false)

    useEffect(() => {

        const scriptSrcs = ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js"]

        scriptSrcs.forEach(src => {
            const script = document.createElement("script");
            script.src = src
            script.async = true
            document.body.appendChild(script);
        })
    }, [])

    const [subject, setSubject, handleChange] = useForm('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [jarvisStart] = useSound(jarvisAction);
    const [jarvisEnd] = useSound(jarvisFinish);

    async function getBoard() {
        if (!subject.txt) return
        jarvisStart()
        try {
            const newAiBoard = await createAiBoard(subject.txt)
            console.log('newAiBoard: ', newAiBoard);
            jarvisEnd()
            setIsJarvis(false)
            navigate(`/board/${newAiBoard._id}`)

        } catch (err) {
            console.log('err', err)
            const newAiBoard = await createAiBoard(subject.txt)
            console.log('newAiBoard: ', newAiBoard);
            setIsJarvis(false)
            navigate(`/board`)

        }

    }
    return (
        <section>
            <div className="container demo">
                <div className="content">
                    <div id="large-header" className="large-header">
                        <canvas onClick={() => setIsJarvis(false)
                        } id="demo-canvas"></canvas>

                        <div className="main-title">
                            <div className="main-title-header">
                                <MainLogo className='logo' />
                            </div>
                            <h3>Jarvis.ai</h3>
                            <div className="main-title-body">
                                <DebounceInput className="Input-text"
                                    minLength={5}
                                    placeholder='board Subject...'
                                    disabled={isDisable}
                                    debounceTimeout={1000}
                                    onChange={handleChange}
                                    name='txt' />
                                <button onClick={() => {
                                    setIsDisable(true)
                                    setIsLoading(true)
                                    getBoard()

                                }} class="btn btn-02">Insert</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}