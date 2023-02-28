import { useState } from "react"
import { CheckboxOpen } from "../../assets/svg/icon-library"
import { UserAvatarIcon } from "../user-avatar-icon"

export function FilterMemberPreview({ member, onSetMemberFilter }) {
    const [isChecked, setIsChecked] = useState(false)

    function onClickMember() {
        setIsChecked(prev => !prev)
        onSetMemberFilter(member._id)
    }

    return (<div onClick={onClickMember} className=" member-container " >
        <div className={isChecked ? "checkbox-filter checked" : 'checkbox-filter '}>
            <CheckboxOpen />
        </div>
        <UserAvatarIcon member={member} />
        <p>{member.fullname}</p>
    </div >)
}