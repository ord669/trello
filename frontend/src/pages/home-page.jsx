import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { CHANGE_COUNT } from '../store/user.reducer'
export function HomePage() {

    return (
        <section className='home-page '>
            <div className="main-home-page ">
                <h1 className='home-page-title'>Trello brings all your tasks, teammates, and tools together</h1>
                <img className="hero-img" src={require(`../assets/img/hero.png`)} alt="hero-img" />
            </div>
        </section >
    )
}