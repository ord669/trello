import { useForm } from "../../../../customHooks/useForm";

export function CoverModal({ board, currTask, getMembers, onSelectMember }) {

    const [filterBy, setFilterBy, handleChange] = useForm({ txt: '' })

    return (
        <section className='covers-modal-container'>
            <div className="covers-modal-header">

            </div>
            <section className='modal-covers-list-container'>
                <h4>Cover</h4>
                <div className="modal-covers-list-body">

                </div>
            </section>
            <section className='modal-covers-list-container'>
                <h4>Photos from Unsplash</h4>
                <div className="modal-covers-list-body">

                </div>
            </section>
        </section>
    )
}