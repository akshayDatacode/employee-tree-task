import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginAPI } from './operations'

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (data.email !== "" && data.password !== "") {
      loginAPI(data).then((res) => {
        setData({
          email: "",
          password: "",
        })
        if (res.success) {
          navigate("/")
        } else {
          setError(res.error.response.data.response.message)
        }
      })
    } else {
      setError("Fileds Required")
    }
  }

  return (
    <>
      <div className="mt-5">
        <h1>Login</h1>
        <div className="row mx-0 d-flex justify-content-center align-items-center">
          <div className="col-6 text-start border rounded shadow p-5 ">
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input name="email" onChange={(e) => handleChange(e)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group mt-4">
                <label for="exampleInputPassword1">Password</label>
                <input name="password" onChange={(e) => handleChange(e)} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary mt-3">Login</button>
              {error !== "" && <p className='mt-2 text-danger'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login