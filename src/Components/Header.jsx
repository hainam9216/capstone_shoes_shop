import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const cartQuantity = useSelector(state => state.addToCart)
    const [totalQuantity, setTotalQuantity] = useState(0)

    const calcTotalQuantity = () => {
        let TotalQuantity = 0
        cartQuantity.productCart.map((prod) => {
            const quatity = parseInt(prod.quantityCart)
            TotalQuantity += quatity
        })
        setTotalQuantity(TotalQuantity)
    }
    useEffect(() => {
        calcTotalQuantity()
    })
    return (
        <div className=''>
            <nav className='nav navbar-extend-sm navbar-dark bg-dark p-3'>
                <NavLink to={'/'} className="nav-item">
                    <img style={{ maxHeight: 50 }} src='https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png' />
                </NavLink>
                <ul className='nav ms-auto my-auto text-white'>
                    <NavLink to={'/search'} style={{ fontSize: 20, textDecoration: 'none' }} className='nav-link text-white my-auto'><i className="fa-solid fa-magnifying-glass"></i> Search</NavLink>
                    <NavLink to={'/carts'} className='nav-link text-white my-auto' style={{ fontSize: 20 }}><i className="fa-solid fa-cart-shopping"></i>({totalQuantity})</NavLink>
                    <NavLink to={'/login'} style={{ fontSize: 20, textDecoration: 'none' }} className='navlink text-white my-auto'>Login</NavLink>
                    <NavLink to={'/register'} style={{ fontSize: 20, textDecoration: 'none' }} className='navlink text-white my-auto ms-3'>Register</NavLink>
                </ul>
            </nav>
            <nav className='nav navbar-extend-sm navbar-dark'>
                <ul className="navbar">
                    <NavLink className="nav-link active" style={{ color: 'black', fontSize: 20 }} to="/" aria-current="page">Home</NavLink>
                    <NavLink className="nav-link" style={{ color: 'black', fontSize: 20 }} to="/" aria-current="page">Men</NavLink>
                    <NavLink className="nav-link" style={{ color: 'black', fontSize: 20 }} to="/" aria-current="page">Woman</NavLink>
                    <NavLink className="nav-link" style={{ color: 'black', fontSize: 20 }} to="/" aria-current="page">Kid</NavLink>
                    <NavLink className="nav-link" style={{ color: 'black', fontSize: 20 }} to="/" aria-current="page">Sport</NavLink>
                </ul>
            </nav>
        </div>

    )
}

export default Header