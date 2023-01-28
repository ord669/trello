import { DebounceInput } from "react-debounce-input"
import { useForm } from "../../customHooks/useForm"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { createAiBoard } from "../../store/board/board.action";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { JarvisHeart } from "./jarvis-heart";
import { useState } from "react";
import jarvisAction from '../../assets/mp3/jarvisAction.mp3';

export function JarvisInputModal({ setIsJarvis }) {
    const [subject, setSubject, handleChange] = useForm('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [jarvisStart] = useSound(jarvisAction);

    useEffectUpdate(async () => {
        jarvisStart()
        const newAiBoard = await createAiBoard(subject.txt)
        navigate(`/board/${newAiBoard._id}`)
        console.log('newAiBoard: ', newAiBoard);
        setIsJarvis(false)
    }, [subject])
    return (
        <section className='jarvis-input-modal'>
            <div className="jarvis-input-container">
                <div className="jarvis-input-header" >
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={1000}
                        onChange={(ev) => {
                            jarvisStart()
                            handleChange(ev)
                        }}
                        name='txt' />

                </div>
                <JarvisHeart isLoading={isLoading} />
            </div>

        </section>
    )
}