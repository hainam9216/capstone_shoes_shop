import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { http } from '../util/config'
import _ from 'lodash'

const Search = () => {

  const tuKhoaRef = useRef('')
  const [searchParam, setSearchParam] = useSearchParams({
    tuKhoa: ''
  })
  const tuKhoa = searchParam.get('tuKhoa')

  const [arrProduct, setArrProduct] = useState([])
  const getProductApi = async (keyword) => {
    const res = await http.get(`/api/Product?keyword=${keyword}`)
    setArrProduct(res.data.content)
  }

  const ascenArr = ()=>{
    const ascenProd = _.orderBy(arrProduct, 'price', 'asc');
    setArrProduct(ascenProd)
    console.log(ascenProd);
  }
  const descArr = ()=>{
    const descProd = _.orderBy(arrProduct, 'price', 'desc');
    setArrProduct(descProd)
  }
  
  const handleChange = (e) => {
    tuKhoaRef.current = e.target.value
    console.log(tuKhoaRef.current);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchParam({
      tuKhoa: tuKhoaRef.current
    })
  }
  useEffect(() => {
    // Lấy dữ liệu param khi giao diện vừa load xong
    getProductApi(tuKhoa)
  }, [tuKhoa])
  return (
    <div className='container'>
      <h5>Search</h5>
      <form onSubmit={handleSubmit} className='form-group row'>
        <input className='form-control col-5' style={{ width: 300 }} name='tuKhoa' id='tuKhoa' onChange={handleChange}></input>
        <button type='submit' className='btn btn-dark my-2 col-1'>Search</button>
      </form>
      <h1 className='text-white p-2 my-3' style={{ backgroundImage: 'linear-gradient(#ff8a00, #e52e71)' }}>Search result</h1>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Price
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a className="dropdown-item" onClick={()=>{ascenArr()}}>Tăng dần</a></li>
          <li><a className="dropdown-item" onClick={descArr}>Giảm dần</a></li>
        </ul>
      </div>
      <div className='row'>
      {arrProduct.map((prod)=>{
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
  )
}

export default Search