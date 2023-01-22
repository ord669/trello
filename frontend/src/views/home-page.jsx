import React from 'react'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const navigate = useNavigate()

    return (
        <section className='home-page'>
            <div className="main-home-page">
                <div className="home-page-content">
                    <h1 className='home-page-title'>
                        Trello brings all your tasks, teammates, and tools together
                    </h1>
                    <p className='home-page-p'>Keep everything in the same place—even if your team isn't.</p>
                    <button onClick={() => navigate(`/board`)}
                        className='home-page-btn'>Start Demo
                    </button>
                </div>
                <img className="hero-img" src={require(`../assets/img/hero.png`)} alt="hero-img" />
            </div>
        </section>
    )
}
