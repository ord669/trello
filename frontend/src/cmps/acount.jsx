import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { userService } from "../services/user.service"
import { logout } from "../store/user.actions"
import { UserAvatarIcon } from "./user-avatar-icon"

export function Acount({ setIsOpenAccount, setLoggdinUser }) {
    const navigate = useNavigate()
    const [loggdinUser, setLoggdinUser] = useState({})

    useEffect(() => {
        setLoggdinUser(userService.getLoggedinUser)
    }, [loggdinUser])

    async function onLogout() {
        try {
            await logout()
            setLoggdinUser('')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onNavigate() {
        navigate('/login')
        setIsOpenAccount(false)
        setLoggdinUser('')
    }
    return (
        <section className='account'>
            <h3 className="account-title">Account</h3>
            <div className="flex align-center gap-10 account-user">
                <span className="account-img"><UserAvatarIcon member={loggdinUser} /></span>
                <p className="user-title">{loggdinUser.fullname}</p>
            </div>

            {loggdinUser.fullname !== "Guest"
                ?
                <button onClick={onLogout} className='btn-login'>Log Out</button>
                :
                <button onClick={onNavigate} className='btn-login'>Log in</button>
            }

        </section>
    )
}