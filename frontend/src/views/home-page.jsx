import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const { board } = useSelector(storeState => storeState.boardModule)
    const navigate = useNavigate()
    // const { mousePos } = useSelector(storeState => storeState.modalModule)

    return (

        <section className='home-page   '>
            {/* <div>
                The mouse is at position{' '}
                <b>
                    ({mousePos.x}, {mousePos.y})
                </b>
            </div> */}
            <div className="main-home-page  ">
                <div className="home-page-content">
                    <h1 className='home-page-title'>
                        Trello brings all your tasks, teammates, and tools together
                    </h1>
                    <p className='home-page-p'>Keep everything in the same place—even if your team isn't.</p>

                    <button onClick={() => navigate(`/board/b101`)}
                        className='home-page-btn'>Start Demo
                    </button>

                </div>
                <img className="hero-img" src={require(`../assets/img/hero.png`)} alt="hero-img" />
            </div>

        </section >
    )
}
