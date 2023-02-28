import { useState } from 'react'
import { login, logout, signup } from '../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useNavigate } from 'react-router-dom'
import { MainLogo } from '../assets/svg/icon-library'
import { ImgUploader } from './img-uploader'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await login(credentials)
            if (!user) return
            showSuccessMsg(`Welcome: ${user.fullname}`)
            clearState()
            navigate('/')
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(ev) {
        ev.preventDefault()
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
            clearState()
            navigate('/board')
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className='main-login-page'>
            <div className='login-logo'>
                <MainLogo />
                <span onClick={() => navigate(`/`)}>Jarvis</span>
            </div>
            <div className="login-page">
                <p className='login-title'>{!isSignup ? 'Log in to Jarvis ' : 'Sign up for your account'}</p>
                {!isSignup && <form className="login-form" onSubmit={onLogin}>
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button className='login-btn'>Continue</button>
                </form>}
                <div className="signup-section">
                    {isSignup && <form className="login-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <div className='login-upload'>
                            <ImgUploader onUploaded={onUploaded} type={'user'} styleClass={{}} />
                        </div>
                        <button className='login-btn' >Signup!</button>
                    </form>}
                </div>
                <button className="btn-signup" onClick={toggleSignup}>{!isSignup ? "Can't log in? Sign up for an account" : 'Already have an account? Log In'}</button>
            </div>
            <img className="login-img-left" src={require(`../assets/img/left.png`)} alt="hero-img" />
            <img className="login-img-right" src={require(`../assets/img/right.png`)} alt="hero-img" />
        </div>
    )
}
