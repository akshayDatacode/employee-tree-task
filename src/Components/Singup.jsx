import { useState } from "react";
import { useNavigate } from "react-router";
import { createEmplyeeAPI, singupAPI } from "./operations";

const Singup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (data.email !== "" && data.password !== "") {
      if (data.password === data.confirmPassword) {
        singupAPI(data).then((res) => {
          debugger
          setData({
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          })
          if (res.success) {
            navigate("/")
          } else {
            setError(res.error.response.data.response.message)
          }
        })
      } else {
        setError("Password Not Match")
      }
    } else {
      setError("Fileds Required")
    }
  }

  return (
    <>
      <div className="mt-5">
        <h1>Signup</h1>
        <div className="row mt-4 mx-0 d-flex justify-content-center align-items-center">
          <div className="col-8 text-start border rounded shadow p-5 ">
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group mt-4">
                <label for="name">Employee   Name</label>
                <input name="name" value={data.name} onChange={(e) => handleChange(e)} type="text" class="form-control" id="name" placeholder="Employee Name" />
              </div>
              <div class="form-group mt-4">
                <label for="password">Password</label>
                <input name="password" value={data.password} onChange={(e) => handleChange(e)} type="password" class="form-control" id="password" placeholder="Password" />
              </div>
              <div class="form-group mt-4">
                <label for="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" value={data.confirmPassword} onChange={(e) => handleChange(e)} type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
              <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary mt-3">Signup</button>
              {error !== "" && <p className='mt-2 text-danger'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default Singup