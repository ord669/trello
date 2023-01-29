import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { userService } from "../services/user.service"
import { logout } from "../store/user.actions"

export function Acount() {
    const navigate = useNavigate()
    const [loggdinUser, setLoggdinUser] = useState({})

    useEffect(() => {
        setLoggdinUser(userService.getLoggedinUser)


    }, [])

    async function onLogout() {
        try {
            await logout()
            setLoggdinUser('')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }
    return (
        <section className='acount'>
            <h3>Acount</h3>
            {loggdinUser.fullname !== "Guest"
                ?
                <button onClick={onLogout} className='btn-login'>Log Out</button>
                :
                <button onClick={() => navigate('/login')} className='btn-login'>Log in</button>
            }

        </section>
    )
}