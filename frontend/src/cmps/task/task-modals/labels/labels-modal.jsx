import { useForm } from "../../../../customHooks/useForm"
import { LabelsModalList } from "./labels-modal-list"

export function LabelsModal({ board, currTask, onSelectLable }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='labels-modal-container'>
            <div className="labels-modal-header">
                <input onChange={handleChange} type="text" name="txt" placeholder="Search labels..." />
            </div>
            <LabelsModalList filterBy={filterBy} board={board} currTask={currTask} onSelectLable={onSelectLable} />
        </section>
    )
}