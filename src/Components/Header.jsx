import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.setItem("user", {})
    navigate('/login')
  }

  return (
    <>
      <div className="row mx-0 border p-3">
        <div className="col-6">
          <h1><Link to="/">My Organization</Link></h1>
        </div>
        <div className="col-6">
          <Link to="/chart"><h6>Organization Chart</h6></Link>
          <Link to="/login"><button className="btn btn-primary me-3">Login</button></Link>
          <button onClick={() => handleLogout()} className="btn btn-danger">Logout</button>
        </div>
      </div>
    </>
  )
}

export default Header