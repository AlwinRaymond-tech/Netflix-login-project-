import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    try {

      const response = await axios.post("https://netflix-login-backend-829u.onrender.com/login",
        {
          email,
          password
        }
      )

      if (response.data.success) {

        navigate("/dashboard")

      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      )

    }

  }

  return (

    <div className="container">

      <div className="overlay">

        <div className="login-box">

          <h1 className="logo">NETFLIX</h1>

          <h2>Sign In</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <button type="submit">
              Sign In
            </button>


            <div className="demo">
              <p>NOTE : Use this Email ID and password for login</p>
              <p>Email: demo@netflix.com</p>
              <p>Password: 123456</p>
            </div>

            {error && <p>{error}</p>}

          </form>

        </div>

      </div>

    </div>

  )

}

export default Login