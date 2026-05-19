import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {

  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault()

    setError('')
    setSuccess('')

    let users =
      JSON.parse(
        localStorage.getItem('users')
      ) || []

    // SIGN UP

    if (isSignup) {

      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        setError(
          'Please fill all fields'
        )
        return
      }

      if (name.length < 3) {
        setError(
          'Name must contain at least 3 characters'
        )
        return
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        setError(
          'Please enter a valid email'
        )
        return
      }

      if (password.length < 6) {
        setError(
          'Password must contain at least 6 characters'
        )
        return
      }

      if (
        password !== confirmPassword
      ) {
        setError(
          'Passwords do not match'
        )
        return
      }

      const userExists =
        users.find(
          user =>
            user.email === email
        )

      if (userExists) {

        setError(
          'User already exists'
        )

        return
      }

      const newUser = {
        name,
        email,
        password
      }

      users.push(newUser)

      localStorage.setItem(
        'users',
        JSON.stringify(users)
      )

      setSuccess(
        'Signup successful. Please login.'
      )

      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      setTimeout(() => {

        setSuccess('')
        setIsSignup(false)

      }, 1500)

    }

    // LOGIN

    else {

      if (
        !email ||
        !password
      ) {

        setError(
          'Please enter email and password'
        )

        return
      }

      const user =
        users.find(
          user =>
            user.email === email
        )

      if (!user) {

        setError(
          'Please sign up before logging in'
        )

        return
      }

      if (
        user.password !== password
      ) {

        setError(
          'Incorrect password'
        )

        return
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify(user)
      )

      setSuccess(
        `Welcome ${user.name}! Login successful`
      )

      setTimeout(() => {

        navigate('/dashboard')

      }, 2000)

    }

  }

  return (

    <form
      className="login-form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >

      <h2>
        {isSignup
          ? 'Sign Up'
          : 'Sign In'}
      </h2>

      {error &&
        <p className="error">
          {error}
        </p>
      }

      {success &&
        <p className="success">
          {success}
        </p>
      }

      {isSignup &&
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          autoComplete="off"
          onChange={(e) =>
            setName(
              e.target.value
            )}
        />
      }

      <input
        type="email"
        placeholder="Email"
        value={email}
        autoComplete="off"
        onChange={(e) =>
          setEmail(
            e.target.value
          )}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        autoComplete="new-password"
        onChange={(e) =>
          setPassword(
            e.target.value
          )}
      />

      {isSignup &&
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )}
        />
      }

      <button type="submit">

        {isSignup
          ? 'Sign Up'
          : 'Sign In'}

      </button>

      <p className="switch-auth">

        {isSignup
          ?
          'Already have an account? '
          :
          'New to Netflix? '
        }

        <span
          onClick={() =>
            setIsSignup(
              !isSignup
            )}
        >

          {isSignup
            ?
            'Sign In'
            :
            'Sign up now'
          }

        </span>

      </p>

    </form>

  )
}

export default LoginForm