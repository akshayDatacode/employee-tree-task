import { useEffect } from "react"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <h1>Home</h1>
    </>
  )
}

export default Home