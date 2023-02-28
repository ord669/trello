import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppHeader } from './app-header'
import { HomeHeader } from './home-header'

export function DynamicHeader() {
    const location = useLocation().pathname
    const [isHome, setIsHome] = useState(false)

    useEffect(() => {
        if (location.length > 1) setIsHome(false)
        else setIsHome(true)
    }, [location])


    return <div className={'full'}>
        {isHome ? <HomeHeader /> : <AppHeader />}
    </div>

}