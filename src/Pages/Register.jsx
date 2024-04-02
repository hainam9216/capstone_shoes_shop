import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { http } from '../util/config'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [passConfirmErr, setpassConfirmErr] = useState('')
  const [submitBtn, setSubmitBtn] = useState()
  const handlePass = (e) => {
    const password = e.target.value
    const confirmPassword = frmRegister.values.password;
    if (password === confirmPassword) {
      setpassConfirmErr('')
      setSubmitBtn('submit')
    } else {
      setpassConfirmErr('Phải trùng mật khẩu')
      setSubmitBtn('button')
    }
  }
  const frmRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: null,
      phone: null,
    },

    validationSchema: yup.object().shape({
      email: yup.string().required('Validation').email('email dont valid'),
      password: yup.string().required('Validation').min(6, 'lỗi min').max(32, 'lỗi max'),
      name: yup.string().required('Validation'),
      phone: yup.string().required('Validation'),
      gender: yup.boolean().required('Validation'),

    }),
    onSubmit: async (userRegister) => {
      if (userRegister.gender === '1') {
        userRegister.gender = true;
      } else if (userRegister.gender === '0') {
        userRegister.gender = false;
      }
      console.log(userRegister);
      // handle dăng kí
      try {
        const response = await http.post('/api/Users/signup', userRegister)
        alert(response.data.message);
        navigate('/login')
      } catch (error) {
        console.log(error);
      }

    }
  })
  return (
    <div className='container'>
      <h1>Register</h1>
      <hr />
      <form className='row' onSubmit={frmRegister.handleSubmit}>
        <div className='col-6 mt-2 form-group'>
          <h5>Email</h5>
          <input id='email' name='email' className='form-group' onChange={frmRegister.handleChange} />
          {frmRegister.errors.email && <p className='text-danger'>{frmRegister.errors.email}</p>}
        </div>
        <div className='col-6 mt-2 form-group'>
          <h5>Name</h5>
          <input id='name' name='name' className='form-group' onChange={frmRegister.handleChange} />
          {frmRegister.errors.name && <p className='text-danger'>{frmRegister.errors.name}</p>}
        </div>
        <div className='col-6 mt-2 form-group'>
          <h5>Password</h5>
          <input id='password' name='password' type='password' className='form-group' onChange={frmRegister.handleChange} />
          {frmRegister.errors.password && <p className='text-danger'>{frmRegister.errors.password}</p>}
        </div>
        <div className='col-6 mt-2 form-group'>
          <h5>Phone</h5>
          <input id='phone' name='phone' className='form-group' onChange={frmRegister.handleChange} />
          {frmRegister.errors.phone && <p className='text-danger'>{frmRegister.errors.phone}</p>}
        </div>
        <div className='col-6 mt-2 form-group'>
          <h5>Password confirm</h5>
          <input id='passwordConfirm' name='passwordConfirm' type='password' className='form-group' onChange={handlePass} />
          {passConfirmErr && <p className='text-danger'>{passConfirmErr}</p>}
        </div>
        <div className='col-6 mt-3 row form-group'>
          <h5 className='col-3'>Gender</h5>
          <div className='p-3 col-3 form-check'>
            <input id='maleConfirm' name='gender' type='radio' style={{ marginInline: '1.05rem' }} className='form-check-input p-3 bg-secondary' value={1} onChange={frmRegister.handleChange} />
            <br></br>
            <p className='form-check-label ms-3'>Male</p>
          </div>
          <div className='p-3 col-6'>
            <input id='femaleConfirm' name='gender' type='radio' className='form-check-input m-1 p-3 bg-secondary' value={0} onChange={frmRegister.handleChange} />
            <br></br>
            <label htmlFor='femaleConfirm' className='form-check-label ms-1'>Female</label>
          </div>
          {frmRegister.errors.gender && <p className='text-danger'>{frmRegister.errors.gender}</p>}

        </div>
        <div className='col-6'></div>
        <button type={submitBtn} style={{ backgroundColor: 'rgb(98, 0, 238)', borderRadius: '20%' }} className='btn btn-success col-1 px-3 py-3'>Submit</button>

      </form>

    </div>
  )
}

export default Register