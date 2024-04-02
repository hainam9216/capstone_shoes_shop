import { useFormik } from 'formik'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { http } from '../util/config'

const Login = () => {
  const navigate = useNavigate()
  const loginByFacebook = async ()=>{
    try {
      const res =await http.post('/api/Users/facebooklogin')
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const frmLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Validation').email('email dont valid'),
      password: yup.string().required('Validation').min(6, 'lỗi min').max(32, 'lỗi max'),
    }),
    onSubmit: async (userLogin) => {
      try {
        const res = await http.post('/api/Users/signin', userLogin)
        // Đăng nhập thành công thì lưu token vào localStorage
        const token = res.data.content.accessToken
        const userLoginResult = res.data.content

        localStorage.setItem('user_Login', JSON.stringify(userLoginResult))
        localStorage.setItem('accesstoken', token)
        // Chuyển sang profile
        navigate('/profile')
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <div className='container center col-7'>
      <h1>Login</h1>
      <hr />
      <form onSubmit={frmLogin.handleSubmit} className='container'>
        <div className='form-group'>
          <p>Email</p>
          <input onChange={frmLogin.handleChange} className='form-control' id='email' placeholder='email' />
          {frmLogin.errors.email && <p className='text-danger'>{frmLogin.errors.email}</p>}
        </div>
        <div className='form-group'>
          <p>Password</p>
          <input onChange={frmLogin.handleChange} type='password' className='form-control' id='password' placeholder='password' />
          {frmLogin.errors.password && <p className='text-danger'>{frmLogin.errors.password}</p>}
        </div>
        <div className='form-group d-flex justify-content-sm-end'>
          <NavLink to={'/register'}>Resgister now?</NavLink>
          <button type='submit' style={{ backgroundColor: 'rgb(98, 0, 238)', borderRadius: '20%' }} className='btn btn-success mx-3 px-3 py-2'>Submit</button>
        </div>
      </form>
      <button onClick={loginByFacebook} className='mt-2 py-2 btn col-12 btn-primary'><i className="fa-brands fa-facebook"></i> Continue with Facebook</button>
    </div>
  )
}

export default Login