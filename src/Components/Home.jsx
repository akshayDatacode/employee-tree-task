import { useEffect } from "react"
import { useNavigate } from "react-router"
import CreateEmployee from "./CreateEmployee"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className="my-5">
        <CreateEmployee />
      </div>
    </>
  )
}

export default Home