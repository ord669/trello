import { useForm } from "../../../../customHooks/useForm";

export function CheckListModal({ board, currTask, getMembers, onSelectMember }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='members-modal-container'>
            <div className="members-modal-header">
                <input onChange={handleChange} type="text" name="txt" placeholder="Search members" />
            </div>
            <section className='modal-members-list-container'>
                <h4>Board members</h4>
                <div className="modal-members-list-body">

                    <div className={"member-container"}>
                        <div className="modal-member-icon">

                        </div>
                        <div className="member-container-text-container">

                        </div>
                        <button className={`clean-btn fa-solid fa-check `} ></button>

                    </div>
                </div>
            </section>
        </section>
    )
}