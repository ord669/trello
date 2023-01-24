import { useForm } from "../../../../customHooks/useForm"
import { LabelsModalList } from "./labels-modal-list"

export function LabelsModal({ board, currTask, toggleTaskLabel }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='labels-modal-container'>
            <div className="modal-header">
                <input
                    type="text"
                    name="txt"
                    autoFocus
                    onChange={handleChange}
                    placeholder="Search labels..." />
            </div>
            <LabelsModalList filterBy={filterBy} board={board} currTask={currTask} toggleTaskLabel={toggleTaskLabel} />
        </section>
    )
}