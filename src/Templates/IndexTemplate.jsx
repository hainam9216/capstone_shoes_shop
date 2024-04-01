import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

const IndexTemplate = () => {
    return (
        <div>
            <Header/>
            <div className='container'>
                <Outlet></Outlet>
            </div>
            <footer className='footer'>
                <Footer/>
            </footer>
        </div>
    )
}

export default IndexTemplate