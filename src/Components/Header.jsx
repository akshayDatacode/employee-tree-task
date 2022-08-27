import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <div className="row mx-0 border p-3">
        <div className="col-6">
          <Link to="/">Home</Link>
        </div>
        <div className="col-6">
          <Link to="/login"><button className="btn btn-primary me-3">Login</button></Link>
          <Link to="/create"><button className="btn btn-primary">Create Employee</button></Link>
        </div>
      </div>
    </>
  )
}

export default Header