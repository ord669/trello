import { useState } from 'react'
import Calendar from 'react-calendar'
import { ArrowRightIcon } from '../../../../assets/svg/icon-library'
import { saveTask } from '../../../../store/board/board.action'
import { closeDynamicModal } from '../../../../store/modal/modal.action'

export function DatesModal({ board, currTask }) {
    const [date, setDate] = useState(new Date())
    const [isDueDate, setIsDueDate] = useState(currTask.dueDate)

    function onClickDay(date, ev) {
        console.log('ev:', ev)
        ev.target.style.backgroundColor = '#42526e'
    }

    function onSaveDueDate() {
        if (!isDueDate) return
        const task = { ...currTask, dueDate: Date.now() }
        saveTask(task)
        closeDynamicModal()
    }

    function onRemoveDueDate() {
        const task = { ...currTask, dueDate: null }
        saveTask(task)
        closeDynamicModal()
    }

    const shortTime = new Intl.DateTimeFormat("en", {
        dateStyle: "short"
    })

    return (
        <section className='dates-modal-container'>
            <section className="modal-header">
                <Calendar
                    // maxDate={new Date(date.getTime() + 31556952000)} // full year
                    onChange={setDate}
                    value={date}
                />
            </section>
            <h5>Due date</h5>
            <section className='date-input'>
                <input type="checkbox"
                checked={isDueDate}
                    onChange={() => setIsDueDate(prev => !prev)} />
                {!!isDueDate ?
                    <section>{shortTime.format(date.getTime())}</section>
                    // <section contentEditable>{shortTime.format(date.getTime())}</section>
                    :
                    <section>M/D/YYYY</section>
                }
            </section>

            <button className="btn-add" onClick={onSaveDueDate}>Save</button>
            <button className="btn-link" onClick={onRemoveDueDate}>Remove</button>
        </section>
    )
}