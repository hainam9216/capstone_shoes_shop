import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='pt-5'>
        <div className='container p-5 d-flex justify-content-around'>
        <div className='border-end' style={{paddingRight:180}}>
                <h4>GET HELP</h4>
                <NavLink to={'/'} className='nav-link'>Home</NavLink>
                <NavLink to={'/'} className='nav-link'>Nike</NavLink>
                <NavLink to={'/'} className='nav-link'>Adidas</NavLink>
                <NavLink to={'/'} className='nav-link'>Contact</NavLink>
            </div>
            <div className='border-end' style={{paddingRight:180}}>
                <h4>SUPPORT</h4>
                <NavLink to={'/'} className='nav-link'>About</NavLink>
                <NavLink to={'/'} className='nav-link'>Contact</NavLink>
                <NavLink to={'/'} className='nav-link'>Help</NavLink>
                <NavLink to={'/'} className='nav-link'>Phone</NavLink>
            </div>
            <div className=''>
                <h4>REGISTER</h4>
                <NavLink to={'/register'} className='nav-link'>Register</NavLink>
                <NavLink to={'/login'} className='nav-link'>Login</NavLink>
            </div>
        </div>
        <footer className='footer bg-secondary text-center text-dark py-2'>
        © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
        </footer>
    </div>
  )
}

export default Footer