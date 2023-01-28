import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MainLogo } from '../assets/svg/icon-library'
import { Jarvis } from '../cmps/jarvis'

export function HomePage() {
    const navigate = useNavigate()

    return (
        <section className='home-page'>
            <div className="main-home-page">
                <div className="home-page-content">
                    <h1 className='home-page-title'>
                        Jarvis brings all your tasks, teammates, and tools together
                    </h1>
                    <p className='home-page-p'>Keep everything in the same place—even if your team isn't.</p>
                    <button onClick={() => navigate(`/board`)}
                        className='home-page-btn'>Start Demo
                    </button>
                </div>
                <img className="hero-img" src={require(`../assets/img/hero.png`)} alt="hero-img" />
            </div>
            <section className='sec-home-container'>
                <div className='cards-container'>
                    <div className="sec-container-card">
                        <h3 className='sec-container-title'>Jarvis Ai</h3>
                        <h2>A productivity powerhouse</h2>
                        <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done. Learn more in our guide for getting started.</p>
                    </div>

                    <div className='sec-container-content'>
                        <div className="home-cards-container">
                            <div className="home-card">
                                <div className="home-card-title">Boards</div>
                                <div className="home-card-content">
                                    <p>Jarvis boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
                                </div>
                            </div>
                            <div className="home-card">
                                <div className="home-card-title">Lists</div>
                                <div className="home-card-content">
                                    <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your teams needs. Theres no wrong way to Jarvis.</p>
                                </div>
                            </div>
                            <div className="home-card">
                                <div className="home-card-title">Tasks</div>
                                <div className="home-card-content">
                                    <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
                                </div>
                            </div>
                        </div>
                        <img className="card-img" src={require(`../assets/img/Carousel_Image_Cards_2x.png`)} alt="hero-img" />
                    </div>

                </div>
            </section>
        </section>
    )
}
