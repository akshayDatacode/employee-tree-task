import { useState } from "react";
import { useNavigate } from "react-router";
import { createEmplyeeAPI } from "./operations";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role:"",
    lineManager:"",
    phone:"",
    address:""
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (data.email !== "" && data.password !== "") {
      createEmplyeeAPI(data).then((res) => {
        setData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          role:"",
          lineManager:"",
          phone:"",
          address:""
        })
        if (res.success) {
          navigate("/login")
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
        <h1>Create Employee Account</h1>
        <div className="row mt-4 mx-0 d-flex justify-content-center align-items-center">
          <div className="col-5 text-start border rounded shadow p-5 ">
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group mt-4">
                <label for="password">Password</label>
                <input name="password" value={data.password} onChange={(e) => handleChange(e)} type="password" class="form-control" id="password" placeholder="Password" />
              </div>
              <div class="form-group mt-4">
                <label for="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" value={data.confirmPassword} onChange={(e) => handleChange(e)} type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
              <div class="form-group mt-4">
                <label for="name">Employee   Name</label>
                <input name="name" value={data.name} onChange={(e) => handleChange(e)} type="text" class="form-control" id="name" placeholder="Employee Name" />
              </div>
              <div class="form-group mt-4">
                <label for="role">Role</label>
                <input name="role" value={data.role} onChange={(e) => handleChange(e)} type="text" class="form-control" id="role" placeholder="Role" />
              </div>
              <div class="form-group mt-4">
                <label for="lineManager">Line Manager</label>
                <input name="lineManager"  value={data.lineManager} onChange={(e) => handleChange(e)} type="text" class="form-control" id="lineManager" placeholder="Line Manager" />
              </div>
              <div class="form-group mt-4">
                <label for="phone">Phone</label>
                <input name="phone" value={data.phone} onChange={(e) => handleChange(e)} type="text" class="form-control" id="lineManager" placeholder="Phone Number" />
              </div>
              <div class="form-group mt-4">
                <label for="address">Address</label>
                <input name="address" value={data.address} onChange={(e) => handleChange(e)} type="text" class="form-control" id="address" placeholder="Address" />
              </div>
              <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary mt-3">Register</button>
              {error !== "" && <p className='mt-2 text-danger'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateEmployee