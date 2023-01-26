import { closeDynamicModal } from "../../../../store/modal/modal.action";

export function ListActions({ onRemoveGroup }) {
    console.log('onRemoveGroup: ', onRemoveGroup);
    return (
        <section className='list-actions'>
            <button>Add card...</button>
            <button> Copy list...</button>
            <button>Move list...</button>
            <button onClick={() => {
                onRemoveGroup()
                closeDynamicModal()
            }}>Remove list...</button>
        </section>
    )
}