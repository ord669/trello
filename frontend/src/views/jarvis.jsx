import { useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input"
import { useForm } from "../customHooks/useForm"
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { createAiBoard } from "../store/board/board.action";
import { useNavigate, useParams } from "react-router-dom";
import useSound from "use-sound";
// import { JarvisHeart } from "./jarvis-heart";
import jarvisAction from '../assets/mp3/jarvisActionGo.mp3';
import jarvisFinish from '../assets/mp3/jarvisActionDidHisJob.mp3';
import { MainLogo, MessegeIcon } from "../assets/svg/icon-library";
// import Typewriter from 'typewriter-effect/dist/core';
import Typewriter from 'typewriter-effect';

// import { JarvisAnimation } from "./jarvis-animation";

export function Jarvis({ setIsOpenJarvis, setIsJarvis }) {
    const [isDisable, setIsDisable] = useState(false)
    const elWriting = useRef()
    const elWriting2 = useRef()

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
    const [isScript2, setIsScript2] = useState(false)

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

    function onSendSubject() {
        setIsDisable(true)
        setIsLoading(true)
        getBoard()
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
                                {/* <MainLogo className='logo' /> */}
                                <h3 onClick={() => {
                                }}>Jarvis.ai</h3>
                            </div>
                            <div className="main-title-body">
                                <div className="paragraph-container">
                                    {!isScript2 && <Typewriter
                                        options={{
                                            loop: false,
                                            delay: 40,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter
                                                .typeString('allow me to intredus my self... ')
                                                .pauseFor(200)
                                                .typeString('my name is jarvis ')
                                                .pauseFor(1000)
                                                .typeString('now please insert the board subject')
                                                .typeString('')
                                                .pauseFor(1000)
                                                .start()
                                        }}
                                    />}
                                    {isScript2 && <Typewriter
                                        options={{
                                            loop: false,
                                            delay: 40,
                                        }}
                                        onInit={(typewriter) => {
                                            typewriter
                                                .typeString('thank you sir ')
                                                .pauseFor(200)
                                                .typeString('now sit back ')
                                                .pauseFor(100)
                                                .typeString('relax and grab a cup of coffe while i am fetchin you the best possible plan for your project')
                                                .typeString('')
                                                .pauseFor(1000)
                                                .start()
                                        }}
                                    />}
                                </div>
                                <div className="input-cotainer">

                                    <DebounceInput className=""
                                        minLength={5}
                                        disabled={isDisable}
                                        debounceTimeout={1000}
                                        onChange={handleChange}
                                        name='txt' />
                                    <div onClick={() => {
                                        setIsScript2(true)
                                        jarvisStart()
                                        onSendSubject()
                                    }} className="icon-container">
                                        <MessegeIcon className='input-cotainer-icon' />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}