import { useState } from "react"
import { ArrowDownIcon } from "../../assets/svg/icon-library"
import { boardService } from "../../services/board.service"

export function TaskFilter() {
    const [filterBy, setFilterBy] = useState(boardService.getEmpteyFilter())
    const [isOpenFilterMember, setIsOpenFilterMember] = useState(false)

    function handleChange({ target }) {
        const { value, name: filed } = target
        const newFilter = { ...filterBy, [filed]: value }
        setFilterBy(newFilter)
    }

    return (
        <section className='task-filter'>
            <p className="task-filter-title">Filter</p>
            <div className="task-filter-layout">
                <p className="filter-keyword">Keyword</p>
                <input
                    type="text"
                    name="title"
                    value={filterBy.title}
                    onChange={handleChange}
                    placeholder="Enter a keyword..."
                />
            </div>
            <div onClick={() => setIsOpenFilterMember(prev => !prev)} className="filter-members flex align-center space-between" >
                <p>Selecet members</p>
                <span><ArrowDownIcon /></span>
            </div>
        </section>
    )
}