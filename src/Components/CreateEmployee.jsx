import { useState } from "react";
import { useNavigate } from "react-router";
import { createEmplyeeAPI, getLineManager } from "./operations";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const roles = [
    { value: 'admin', name: "Admin" },
    { value: 'projectManager', name: 'Project Manager' },
    { value: 'softwareEngineer', name: 'Software Engineer' },
    { value: 'designer', name: 'Designer' },
    { value: 'intern', name: 'Intern' },
    { value: 'qaEngineer', name: 'QA Engineer' }
  ]

  // const getLineManager = (role) => {
  //   let temp = []

  //   if (role === 'Admin') {
  //     return temp = []
  //   }

  //   if (role === 'Project Manager') {
  //     return temp = ['Admin']
  //   }

  //   if (role === 'Software Engineer' || 'QA Engineer' || 'Designer') {
  //     return temp = ['Admin', 'Project Manager']
  //   }

  //   if (role === 'Intern') {
  //     return temp = ['Admin', 'Project Manager', 'Software Engineer', 'QA Engineer', 'Designer']
  //   }
  // }


  const [data, setData] = useState({
    email: "",
    name: "",
    role: 'admin',
    line_manager: "",
    phone: "",
    address: ""
  })
  const [error, setError] = useState('')
  const [lineOptions, setLineOptions] = useState([])

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
          name: "",
          role: "",
          line_manager: "",
          phone: "",
          address: ""
        })

        if (res.success) {
          alert("Employee Added")
        } else {
          setError(res.error.response.data.response.message)
        }
      })
    } else {
      setError("Fileds Required")
    }
  }

  const handleRole = (e) => {
    let role = e.target.value
    setLineOptions([])
    setData({ ...data, role: role })
    getLineManager(role).then((res) => {
      if (res) {
        setLineOptions(res.data)
      }
    })
  }

  return (
    <>
      <div className="mt-5">
        <h1>Add Employee</h1>
        <div className="row mt-4 mx-0 d-flex justify-content-center align-items-center">
          <div className="col-5 text-start border rounded shadow p-5 ">
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input name="email" value={data.email} onChange={(e) => handleChange(e)} type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group mt-4">
                <label for="name">Employee   Name</label>
                <input name="name" value={data.name} onChange={(e) => handleChange(e)} type="text" class="form-control" id="name" placeholder="Employee Name" />
              </div>
              <div className="row mx-0">
                <div className="col-6">
                  <div class="form-group mt-4">
                    <label for="role">Role</label>
                    <select class="form-select" value={data.role} name='role' onChange={(e) => handleRole(e)}>
                      {roles.map((role) => (
                        <option value={role.value}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-group mt-4">
                    <label for="lineManager">Line Manager</label>

                    <select disabled={data.role === 'admin'} class="form-select" value={data.line_manager} name='line_manager' onChange={(e) => handleChange(e)}>
                      {lineOptions.map((lm) => (
                        <option value={lm.name}>{lm.name}</option>
                      ))}
                    </select>

                  </div>
                </div>
              </div>
              <div class="form-group mt-4">
                <label for="phone">Phone</label>
                <input name="phone" value={data.phone} onChange={(e) => handleChange(e)} type="text" class="form-control" id="lineManager" placeholder="Phone Number" />
              </div>
              <div class="form-group mt-4">
                <label for="address">Address</label>
                <input name="address" value={data.address} onChange={(e) => handleChange(e)} type="text" class="form-control" id="address" placeholder="Address" />
              </div>
              <button onClick={(e) => handleSubmit(e)} type="submit" class="btn btn-primary mt-3" disabled={data.role === 'admin'}>Register</button>
              {error !== "" && <p className='mt-2 text-danger'>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateEmployee