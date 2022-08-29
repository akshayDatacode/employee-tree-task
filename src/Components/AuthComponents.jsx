import Login from "./Login"
import Singup from "./Singup"

const AuthComponents = () => {
  return (
    <>
      <div className="row mx-0">
        <div className="col-6">
          <Login />
        </div>
        <div className="col-6">
          <Singup />
        </div>
      </div>
    </>
  )
}

export default AuthComponents