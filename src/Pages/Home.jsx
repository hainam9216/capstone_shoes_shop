import axios from 'axios'
import React, { Component, useEffect, useRef, useState } from 'react'
import { http } from '../util/config'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const [arrProduct, setArrProduct] = useState([])
    const [activeItemId, setActiveItemId] = useState(0)
    const [activeItem, setActiveItem] = useState({
        id: 1,
        name: "vans black",
        alias: "vans-black-black",
        price: 200,
        description: "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
        size: [32, 33, 34, 35],
        shortDescription: "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        quantity: 100,
        deleted: false,
        categories: "[{\"id\": \"VANS_CONVERSE\",\"category\":\"VANS_CONVERSE\"}]",
        relatedProducts: "[2,3,1]",
        feature: true,
        image: "https://shop.cyberlearn.vn/images/vans-black-black.png"
    })

    const getProductDetailApi = async () => {
        try {
            const res = await http.get('/api/Product')
            setArrProduct(res.data.content)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProductDetailApi()
        // Tắt chuyển động carousel

    }, [])
    const hanldeActiveItem = (prodId) => {
        if (prodId >= 1 && prodId < arrProduct.length) {
            setActiveItemId(prodId)
            setActiveItem(arrProduct[prodId])
            console.log(arrProduct[prodId]);
        }
    }
    return (
        <div>
            <div className='container d-flex pt-4'>
                {/* Carousel */}
                <div id="carouselExampleControls" style={{ width: '60%' }} className="carousel slide" data-bs-ride="carousel"  >
                    <div className="carousel-inner" >
                        {arrProduct.map((prod) => {
                            return <div className="carousel-item" data-bs-interval="999999999" key={prod.id}>
                                <img src={prod.image} className="d-block w-100" alt="..." />
                            </div>
                        })}
                        <div id="ads" className="carousel-item active" data-bs-interval="999999999">
                            <img src="https://shop.cyberlearn.vn/images/vans-black-black.png" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button onClick={() => {
                        hanldeActiveItem(activeItemId - 1)
                    }} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={activeItemId - 1}>
                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button onClick={() => {
                        hanldeActiveItem(activeItemId + 1)
                    }} className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to={activeItemId + 1}>
                        <span className="carousel-control-next-icon bg-dark" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div style={{ width: '40%', paddingTop: '8rem', paddingLeft: '5rem' }} className=''>
                    <h1>{activeItem.name.toUpperCase()}</h1>
                    <p>{activeItem.shortDescription}</p>
                    <NavLink to={`/detail/${activeItemId + 1}`} className='px-5 py-3 text-white' style={{ fontSize: 20, background: 'rgb(248, 182, 83)', textDecoration: 'none' }}>Buy now</NavLink>
                </div>
            </div>
            {/* Product feature */}
            <div className='container pt-5'>
                <div className='p-2' style={{ width: '50%', backgroundImage: 'linear-gradient(#ff8a00, #e52e71)' }}>
                    <h2 className='text-dark'>Product Feature</h2>
                </div>
                <div className='py-5 row'>
                    {arrProduct.map((prod) => {
                        return <div className='col-4' key={prod.id}>
                            <div className="card p-3" >
                                <img src={prod.image} className="card-img-top" alt="..." />
                                <div className="card-body p-0">
                                    <h5 className="card-title ps-2 pt-2">{prod.name}</h5>
                                    <p className="card-text ps-2">{prod.shortDescription}</p>
                                </div>
                            </div>
                            <div className='d-flex'>
                                <NavLink to={`/detail/${prod.id}`} className='text-white w-50 p-3 text-center' style={{ background: 'rgb(157, 225, 103)', textDecoration: 'none', fontSize: 20 }}>Buy now</NavLink>
                                <button disabled className='text-white w-50 p-3' style={{ background: 'gray', borderRadius: 'none', border: 'none' }}>{prod.price}$</button>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    )
}

export default Home