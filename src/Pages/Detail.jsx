import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { http } from '../util/config'
import { random } from 'lodash'

const Detail = () => {

  const param = useParams()
  const [arrProduct, setArrProduct] = useState([])
  const [addCart, setAddCart] = useState({
    id: '',
    quantityOnCart: '',
    sizeOnCart: ''
  })
  const [quantityOnCart, setQuantityOnCart] = useState(1)
  const [productDetail, setProductDetail] = useState({
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
    image: "https://shop.cyberlearn.vn/images/vans-black-black.png",
  })
  //xu li nhap so luong
  const handleChange = (event) => {
    setQuantityOnCart(event.target.value)
    console.log(quantityOnCart);
  }
  // xu lí submit
  const handleSubmit = () => {
    console.log(132);
  }

  //render related product
  const getProductDetailApi = async () => {
    try {
      const res = await http.get('/api/Product')
      setArrProduct(res.data.content)

    } catch (error) {
      console.log(error);
    }
  }

  // render đối tượng
  const getProductByIdApi = async (prodId) => {
    try {
      const res = await http.get('/api/Product/getbyid?id=' + param.id)
      setProductDetail(res.data.content)

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProductDetailApi()
    getProductByIdApi()


  }, [])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <img src={productDetail.image} />
        </div>
        <div className='col'>
          <h1>{productDetail.name.toUpperCase()}</h1>
          <p>{productDetail.description}</p>
          <p style={{ color: 'green' }}>Available size</p>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              {
                productDetail.size.map((prodSize) => {
                  return <div className="col-1" key={prodSize}>
                    <input type="checkbox" className="btn-check" id={prodSize} autoComplete="on" />
                    <label className="btn btn-outline-primary" htmlFor={prodSize}>{prodSize}</label>
                  </div>

                })
              }
            </div>
            <h3 className=' text-danger mt-2' style={{ width: 'auto' }}>{productDetail.price} $</h3>
            <div className=' d-flex'>
              <button type='button' id='minusBtn' name='minusBtn' className='btn btn-success ms-2 ' onClick={() => setQuantityOnCart(quantityOnCart - 1)}>-</button>
              <input type='number' maxLength={3} className='ms-2' style={{width:100}} name='quantityOnCart' value={quantityOnCart} id='quantityOnCart' onChange={handleChange} />
              <button type='button' id='addBtn' name='addBtn' className='btn btn-success ms-2' onClick={() => setQuantityOnCart(quantityOnCart + 1)}>+</button>
            </div>
            <div className='mt-3'>
              <button className='text-white border-0 px-5 py-3' type='submit' style={{ backgroundImage: 'linear-gradient(#ff8a00, #e52e71)' }}>Add to cart</button>
            </div>
          </form>
        </div>
      </div>
      {/* Relative product */}
      <div>
        <h1 className='text-center mt-5'>-Relative product-</h1>
        <div className='container row'>
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
                <a href={`/detail/${prod.id}`} className='text-white w-50 p-3 text-center' style={{ background: 'rgb(157, 225, 103)', textDecoration: 'none', fontSize: 20 }}>Buy now</a>
                <button disabled className='text-white w-50 p-3' style={{ background: 'gray', borderRadius: 'none', border: 'none' }}>{prod.price}$</button>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}

export default Detail