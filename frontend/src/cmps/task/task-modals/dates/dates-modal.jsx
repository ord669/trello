import { useRef, useState } from 'react'
import Calendar from 'react-calendar'
import { ArrowRightIcon } from '../../../../assets/svg/icon-library'
import { saveTask } from '../../../../store/task/task.action'
import { closeDynamicModal } from '../../../../store/modal/modal.action'

export function DatesModal({ board, currTask }) {
    const [date, setDate] = useState(new Date())
    const [isDueDate, setIsDueDate] = useState(currTask.dueDate)
    const elPrevDate = useRef()

    function onClickDay(date, ev) {
        if (elPrevDate.current) {
            elPrevDate.current.style.backgroundColor = 'inherit'
            elPrevDate.current.style.color = 'inherit'
        }
        ev.target.style.backgroundColor = '#42526e'
        ev.target.style.color = '#fff'
        elPrevDate.current = ev.target
    }

    function onSaveDueDate() {
        if (!isDueDate) return
        const task = { ...currTask, dueDate: date.getTime(), isDone: false }
        try {
            saveTask(task)
        } catch (err) {
            console.log('err from save due date', err)
        }
        closeDynamicModal()
    }

    function onChange(date) {
        setDate(date)
    }

    function onRemoveDueDate() {
        const task = { ...currTask, dueDate: null, isDone: false }
        try {
            saveTask(task)
        } catch (err) {
            console.log('err from remove due date', err)
        }
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
                    calendarType="US"
                    locale="en"
                    onClickDay={onClickDay}
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