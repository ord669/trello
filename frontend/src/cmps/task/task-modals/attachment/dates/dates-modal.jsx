import { useState } from 'react'
import Calendar from 'react-calendar'

export function DatesModal({ board, currTask }) {
    const [date, setDate] = useState(new Date())
    console.log('date:', date);

    return (
        <section className='dates-modal-container'>
            <div className="modal-header">
                <Calendar onChange={setDate} value={date}
                allowPartialRange />
            </div>

            <button className="btn-add">Save</button>
            <button className="btn-link">Remove</button>
        </section>
    )
}