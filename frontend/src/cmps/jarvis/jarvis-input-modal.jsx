import { DebounceInput } from "react-debounce-input"
import { useForm } from "../../customHooks/useForm"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { createAiBoard } from "../../store/board/board.action";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import jarvisAction from '../../assets/mp3/jarvisActionGo.mp3';
import jarvisFinish from '../../assets/mp3/jarvisActionDidHisJob.mp3';

export function JarvisInputModal({ setIsJarvis }) {
    const [subject, setSubject, handleChange] = useForm('')
    const navigate = useNavigate()
    const [jarvisStart] = useSound(jarvisAction);
    const [jarvisEnd] = useSound(jarvisFinish);

    useEffectUpdate(async () => {
        if (!subject.txt) return
        jarvisStart()
        const newAiBoard = await createAiBoard(subject.txt)
        jarvisEnd()
        navigate(`/board/${newAiBoard._id}`)
        setIsJarvis(false)
    }, [subject])
    return (
        <section className='jarvis-input-modal'>
            <div className="jarvis-input-container">
                <div className="jarvis-input-header" >
                </div>
                <DebounceInput className="Input-text"
                    minLength={5}
                    placeholder='Insert Subject'
                    disabled={false}
                    debounceTimeout={1000}
                    onChange={(ev) => {
                        if (ev.target.value.length < 5) return
                        setIsLoading(true)
                        handleChange(ev)
                    }}
                    name='txt' />
            </div>
        </section>
    )
}